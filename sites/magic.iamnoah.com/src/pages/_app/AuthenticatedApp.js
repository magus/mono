import * as React from 'react';

import { MagicAuthProvider } from '@magusn/react';
import LoginGate from '@components/LoginGate';

import AppShell from './AppShell';
import Providers from './Providers';

export default function AuthenticatedApp(props) {
  // console.debug({ props });

  const { Component, pageProps } = props;

  return (
    <Providers>
      <MagicAuthProvider>
        <AppShell {...props}>
          <LoginGate>
            <Component {...pageProps} />
          </LoginGate>
        </AppShell>
      </MagicAuthProvider>
    </Providers>
  );
}
