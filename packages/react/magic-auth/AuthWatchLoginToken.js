import * as React from 'react';

import { useMagicAuth } from './useMagicAuth';
import graphql from './graphql/queries';

function WatchLoginToken({ loginTokenId, handleLogout }) {
  const { loginToken, ...result } = graphql.watchLoginToken(loginTokenId);

  React.useEffect(() => {
    async function asyncEffect() {
      if (!result.loading && !result.error && !loginToken) {
        // loginToken is missing, logout immediately
        console.debug('[AuthWatchLoginToken]', 'no error and loginToken missing', 'logout');
        await handleLogout();
      }
    }

    asyncEffect();
  }, [result.loading, loginToken]);

  return null;
}

export function AuthWatchLoginToken() {
  const auth = useMagicAuth();

  if (auth.isLoggedIn) {
    return <WatchLoginToken loginTokenId={auth.loginRequestId} handleLogout={auth.actions.logout} />;
  }

  return null;
}
