import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { Spacer, Button } from '@magusn/react';

import Page from 'src/components/Page';
import { MagicAuth } from '@magusn/react/magic-auth';

const LoginActivity = dynamic(() =>
  import(
    /* webpackChunkName: "LoginActivity" */
    /* webpackPrefetch: true */
    'src/components/LoginActivity'
  ),
);

HomePage.title = null;

export default function HomePage() {
  const auth = MagicAuth.useAuth();

  // console.debug('[Home]', { auth });

  return (
    <Page>
      <Spacer vertical size={6} />

      <Content>
        <Email>{!auth.user ? <span>&lrm;</span> : auth.user.email}</Email>

        <LoginActivity />

        <Button onClick={auth.actions.logout}>Logout</Button>
      </Content>
    </Page>
  );
}

const Content = styled.div`
  max-height: 100%;
  max-width: 100%;
  overflow-y: auto;
`;

const Email = styled.h1`
  font-size: var(--spacer-3);
  font-weight: 100;
`;
