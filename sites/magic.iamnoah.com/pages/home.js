import * as React from 'react';

import Page from 'src/components/Page';
import Button from 'src/components/Button';
import LoginActivity from 'src/components/LoginActivity';
import { useMagicAuth } from '@magusn/react';

import styles from 'styles/Home.module.css';

HomePage.title = null;

export default function HomePage() {
  const auth = useMagicAuth();

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
