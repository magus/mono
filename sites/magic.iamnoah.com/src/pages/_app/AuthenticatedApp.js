import * as React from 'react';

import { useModal } from '@components/Modal';
import CheckEmailModal from '@components/CheckEmailModal';
import { MagicAuthProvider } from '@magusn/react';
import AuthWatchLoginToken from '@components/AuthWatchLoginToken';
import ApolloProvider from '@components/ApolloProvider';
import LoginGate from '@components/LoginGate';

import AppShell from './AppShell';
import Providers from './Providers';

export default function AuthenticatedApp(props) {
  // console.debug({ props });

  const { Component, pageProps } = props;

  return (
    <Providers>
      <AuthProviderGroup>
        <AppShell {...props}>
          <LoginGate>
            <Component {...pageProps} />
          </LoginGate>
        </AppShell>
      </AuthProviderGroup>
    </Providers>
  );
}

function AuthProviderGroup({ children }) {
  const modal = useModal();

  function onLoginRequest(json) {
    modal.open(CheckEmailModal, {
      props: json,
      disableBackgroundDismiss: true,
    });
  }

  return (
    <MagicAuthProvider onLoginRequest={onLoginRequest}>
      <ApolloProvider>
        <AuthWatchLoginToken />
        {children}
      </ApolloProvider>
    </MagicAuthProvider>
  );
}
