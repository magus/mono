import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';

import { useAdhocSubscription } from './useAdhocSubscription';

import { HEADERS } from './Headers';
import { ROLES } from './Roles';

const gqls = {
  watchLoginRequest: gql`
    subscription WatchLoginRequest {
      loginToken {
        approved
        id
      }
    }
  `,

  watchLoginToken: gql`
    subscription WatchLoginToken($loginTokenId: uuid!) {
      loginToken: loginToken_by_pk(id: $loginTokenId) {
        id
      }
    }
  `,

  me: gql`
    query Me {
      me: user {
        id
        email
        created
        updated
      }
    }
  `,

  watchLoginRequests: gql`
    subscription LoginRequests {
      loginToken(order_by: { created: desc }) {
        id
        created
        expires
        approved
        ip
        userAgent
        geoCity: geo(path: "city")
        geoState: geo(path: "code.state")
        geoCountry: geo(path: "code.country")
        geoCountryFull: geo(path: "country")
        domain
      }
    }
  `,

  watchRefreshTokens: gql`
    subscription RefreshTokens {
      refreshToken(order_by: { lastActive: desc }) {
        id: loginTokenId
        created
        expires
        ip
        lastActive
        userAgent
        geoCity: geo(path: "city")
        geoState: geo(path: "code.state")
        geoCountry: geo(path: "code.country")
        geoCountryFull: geo(path: "country")
        loginToken {
          domain
        }
      }
    }
  `,
};

export default {
  query,

  watchLoginRequest: (jwtToken) => {
    const result = useAdhocSubscription(gqls.watchLoginRequest, {
      role: ROLES.login,
      jwt: jwtToken.encoded,
    });

    let approved = false;

    if (!result.error && result.data && result.data.loginToken) {
      // extract approved
      const [loginToken] = result.data.loginToken;
      if (loginToken) {
        approved = loginToken.approved;
      }
    }

    return approved;
  },

  watchLoginToken: (loginTokenId) => {
    const result = useAdhocSubscription(gqls.watchLoginToken, {
      role: ROLES.self,
      variables: { loginTokenId },
    });

    let loginToken = null;

    if (!result.error && result.data && result.data.loginToken) {
      loginToken = result.data.loginToken;
    }

    return { ...result, loginToken };
  },

  me: (websocket) => {
    const [get, result] = useLazyQuery(gqls.me, {
      fetchPolicy: 'cache-and-network',
      context: {
        role: ROLES.self,
        websocket,
      },
    });

    let self;

    if (!result.error && result.data) {
      const [me] = result.data.me;
      self = me;
    }

    return [get, self];
  },

  watchLoginRequests: () => {
    const result = useAdhocSubscription(gqls.watchLoginRequests, {
      role: ROLES.self,
    });

    let loginRequests = [];

    if (!result.error && result.data && Array.isArray(result.data.loginToken)) {
      loginRequests = result.data.loginToken;
    }

    const loading = result.error || result.loading;
    return { loading, loginRequests };
  },

  watchRefreshTokens: () => {
    const result = useAdhocSubscription(gqls.watchRefreshTokens, {
      role: ROLES.self,
    });

    let refreshTokens = [];

    if (!result.error && result.data && Array.isArray(result.data.refreshToken)) {
      refreshTokens = result.data.refreshToken;
    }

    const loading = result.error || result.loading;
    return { loading, refreshTokens };
  },
};

async function query(client, query, options = {}) {
  const role = options.role || ROLES.user;

  const queryResult = await client.query({
    query,
    variables: options.variables,
    context: {
      headers: {
        [HEADERS.role]: role,
        ...options.headers,
      },
    },
  });

  return queryResult;
}
