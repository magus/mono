import * as React from 'react';

import AppShell from './AppShell';
import Providers from './Providers';

import LoginGate from '@components/LoginGate';

export default function App(props) {
  return (
    <Providers {...props}>
      <AppShell {...props}>
        <AuthApp {...props} />
      </AppShell>
    </Providers>
  );
}

function AuthApp(props) {
  const { Component, pageProps } = props;
  // console.debug({ Component, pageProps });

  if (Component.disableAuth) {
    return <Component {...pageProps} />;
  }

  return (
    <LoginGate>
      <Component {...pageProps} />
    </LoginGate>
  );
}
