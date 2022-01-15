import * as React from 'react';
import dynamic from 'next/dynamic';

import { MagicAuth } from '@magusn/react/magic-auth';
import LoginPage from 'pages/auth/login';

import LoginGateCover from '@components/LoginGate/LoginGateCover';

const LoginGateCoverAnimated = dynamic(
  () =>
    import(
      /* webpackChunkName: "LoginGateCoverAnimated" */
      /* webpackPrefetch: true */
      '@components/LoginGate/LoginGateCoverAnimated'
    ),
  {
    loading: LoginGateCover,
  },
);

export default function LoginGate(props) {
  return (
    <React.Fragment>
      <LoginGateContent {...props} />
      <LoginGateCoverAnimated />
    </React.Fragment>
  );
}

function LoginGateContent({ children }) {
  const auth = MagicAuth.useAuth();

  if (!auth.isLoggedIn) {
    return <LoginPage />;
  }

  return children;
}
