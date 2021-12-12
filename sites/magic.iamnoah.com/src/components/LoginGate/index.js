import * as React from 'react';
import dynamic from 'next/dynamic';

import { useMagicAuth } from '@magusn/react';
import LoginPage from 'pages/auth/login';

import LoginGateCover from '@components/LoginGate/LoginGateCover';

const LoginGateCoverAnimated = dynamic(() => import('@components/LoginGate/LoginGateCoverAnimated'), {
  loading: LoginGateCover,
});

export default function LoginGate(props) {
  return (
    <React.Fragment>
      <LoginGateContent {...props} />
      <LoginGateCoverAnimated />
    </React.Fragment>
  );
}

function LoginGateContent({ children }) {
  const auth = useMagicAuth();

  if (!auth.isLoggedIn) {
    return <LoginPage />;
  }

  return children;
}
