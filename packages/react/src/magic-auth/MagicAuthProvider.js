import * as React from 'react';

import * as Modal from './Modal';
import ApolloProvider from './graphql/ApolloProvider';
import { AuthWatchLoginToken } from './AuthWatchLoginToken';
import { Context } from './Context';
import { usePageVisibility } from '../hooks/usePageVisibility';

const LOGGED_OUT_STATE = { jwt: null, user: null };
const EXPIRE_TIMER_FREQUENCY_MS = 5 * 1000;
const EXPIRE_DURATION_THRESHOLD = 0.25;

export function MagicAuthProvider(props) {
  return (
    <Modal.Provider>
      <MagicAuthProviderInternal>
        {props.children}
        <Modal.Portal />
      </MagicAuthProviderInternal>
    </Modal.Provider>
  );
}

function MagicAuthProviderInternal(props) {
  const instance = React.useRef({
    pendingRefresh: null,
    timerFrequencyMs: EXPIRE_TIMER_FREQUENCY_MS,
  });

  const [state, set_state] = React.useState(LOGGED_OUT_STATE);
  const [init, set_init] = React.useState(false);

  const modal = Modal.useModal();

  function onLoginRequest(json) {
    modal.open(Modal.Modals.CheckEmailModal, {
      props: json,
      disableBackgroundDismiss: true,
    });
  }

  // console.debug('[MagicAuthProvider]', { init, state });

  // init with a refresh
  React.useEffect(() => {
    async function asyncEffect() {
      await instance.current.refreshTokens();
      set_init(true);
    }

    asyncEffect();
  }, []);

  // init with a page visiblity listener
  usePageVisibility(async (isVisible) => {
    if (isVisible) {
      const timeUntilThreshold = timeUntilExpireThresholdMs(state.expires, state.expireThreshold);
      // console.debug('[MagicAuthProvider]', 'usePageVisibility', { timeUntilThreshold });
      if (typeof timeUntilThreshold === 'number' && timeUntilThreshold <= 0) {
        // refresh needed
        await instance.current.refreshTokens();
      }
    }
  });

  // track expires time to refresh jwt as needed
  React.useEffect(() => {
    // do nothing if expires is not a date
    if (!(state.expires instanceof Date)) {
      // console.debug('[MagicAuthProvider]', 'checkExpires', 'skip');
      return;
    }

    let timeoutId;

    async function checkExpires() {
      // calculate time in ms until threshold
      const timeUntilThreshold = timeUntilExpireThresholdMs(state.expires, state.expireThreshold);

      // refresh token if within expireThreshold
      if (timeUntilThreshold <= 0) {
        await instance.current.refreshTokens();
      }
      // wait until threshold or ping at default frequency
      const nextTimeoutMs = timeUntilThreshold > 0 ? timeUntilThreshold : instance.current.timerFrequencyMs;

      // eslint-disable-next-line no-console
      console.debug('[MagicAuthProvider]', 'checkExpires', { timeUntilThreshold, nextTimeoutMs });

      // call again near expire threshold
      timeoutId = setTimeout(checkExpires, nextTimeoutMs);
    }

    // start checking expires
    timeoutId = setTimeout(checkExpires, instance.current.timerFrequencyMs);

    return function cleanup() {
      // console.debug('checkExpires', 'cleanup');
      clearTimeout(timeoutId);
    };
  }, [state.expires, state.expireThreshold]);

  async function setAuthentication(json) {
    const { jwtToken, loginRequestId, user } = json;
    const jwt = jwtToken.encoded;
    const expires = new Date(jwtToken.expires);
    const expireThreshold = EXPIRE_DURATION_THRESHOLD * (expires - Date.now());

    set_state({
      ...state,
      loginRequestId,
      user,
      jwt,
      expires,
      expireThreshold,
    });
    return jwt;
  }

  async function logout() {
    set_state(LOGGED_OUT_STATE);
    await fetch('/api/auth/logout', { method: 'POST' });
    // window.location = '/';
  }

  async function login(email) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
      const json = await response.json();
      if (json) {
        onLoginRequest(json);
      }
    }
  }

  async function completeLogin() {
    const response = await fetch('/api/auth/complete', {
      method: 'POST',
    });
    if (response.status === 200) {
      const json = await response.json();
      if (json.jwtToken) {
        await setAuthentication(json);
      }
    }
  }

  instance.current.refreshTokens = async function refreshTokens() {
    // skip on server
    if (!process.browser) return;

    if (instance.current.pendingRefresh) {
      const capturedPendingRefresh = instance.current.pendingRefresh;
      return await capturedPendingRefresh;
    }

    async function handleRefreshTokens() {
      try {
        const response = await fetch('/api/auth/refresh', { method: 'POST' });

        const json = await response.json();

        if (json.error) {
          await logout();
          return true;
        } else if (json.loginRequestApproved) {
          await completeLogin();
          return true;
        } else if (json.loginRequest) {
          onLoginRequest(json.loginRequest);
          return true;
        } else if (json.jwtToken) {
          await setAuthentication(json);
          return true;
        } else if (response.status === 200) {
          // no-op, no cookie no refresh
          return true;
        }

        // eslint-disable-next-line no-console
        console.error('[MagicAuthProvider]', 'handleRefreshTokens', { response, json });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[MagicAuthProvider]', 'handleRefreshTokens', { error });
      }

      return false;
    }

    // set shared pendingRefresh
    instance.current.pendingRefresh = handleRefreshTokens();

    // wait shared pending refresh
    const result = await instance.current.pendingRefresh;

    // handle backoff for retrying
    if (!result) {
      // unable to handle response, increase latency for next request
      // eslint-disable-next-line no-console
      console.debug('[MagicAuthProvider]', 'exponential backoff timerFrequencyMs');
      instance.current.timerFrequencyMs *= 2;
    } else {
      // reset timer frequency
      // eslint-disable-next-line no-console
      console.debug('[MagicAuthProvider]', 'restoring timerFrequencyMs');
      instance.current.timerFrequencyMs = EXPIRE_TIMER_FREQUENCY_MS;
    }

    // reset pendingRefresh back to null
    instance.current.pendingRefresh = null;

    return result;
  };

  const isLoggedIn = !!state.jwt;

  const value = {
    ...state,
    init: init || !!state.jwt,
    isLoggedIn,
    actions: {
      logout,
      login,
      completeLogin,
      refreshTokens: instance.current.refreshTokens,
    },
  };

  return (
    <Context.Provider {...{ value }}>
      <ApolloProvider>
        <AuthWatchLoginToken />
        {props.children}
      </ApolloProvider>
    </Context.Provider>
  );
}

function timeUntilExpireThresholdMs(expires, threshold) {
  if (expires instanceof Date) {
    const timeLeftMs = expires.getTime() - Date.now();
    // calculate time in ms until threshold
    const timeUntilThreshold = timeLeftMs - threshold;
    return timeUntilThreshold;
  }

  return null;
}
