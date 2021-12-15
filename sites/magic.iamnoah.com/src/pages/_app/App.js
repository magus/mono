import * as React from 'react';
import dynamic from 'next/dynamic';

import LoggedOutApp from './LoggedOutApp';
import LoadingApp from './LoadingApp';

const AuthenticatedApp = dynamic(
  () =>
    import(
      /* webpackChunkName: "AuthenticatedApp" */
      /* webpackPrefetch: true */
      '@pages/_app/AuthenticatedApp'
    ),
  {
    loading: LoadingApp,
  },
);

export default function App(props) {
  const { Component } = props;
  // console.debug({ Component, pageProps });

  if (Component.disableAuth) {
    return <LoggedOutApp {...props} />;
  }

  return <AuthenticatedApp {...props} />;
}
