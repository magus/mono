import * as React from 'react';
import dynamic from 'next/dynamic';

import Page from 'src/components/Page';
import { Button, MagicAuth } from '@magusn/react';

import styles from 'styles/Home.module.css';

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
    <Page className={styles.container}>
      <div className={styles.containerContent}>
        <h1 className={styles.email}>{!auth.user ? <span>&lrm;</span> : auth.user.email}</h1>

        <LoginActivity />

        <Button onClick={auth.actions.logout}>Logout</Button>
      </div>
    </Page>
  );
}
