import * as React from 'react';

import Button from 'src/components/Button';
import { useMagicAuth } from '@magusn/react';
import graphql from 'src/client/graphql/queries';

import styles from 'styles/Login.module.css';

export default function CheckEmailModal({ dismiss, jwtToken, phrase }) {
  const auth = useMagicAuth();
  const approved = graphql.watchLoginRequest(jwtToken);

  React.useEffect(async () => {
    if (approved) {
      await auth.actions.completeLogin();
    }
  }, [approved]);

  React.useEffect(() => {
    if (auth.isLoggedIn) {
      dismiss();
    }
  }, [auth.isLoggedIn]);

  async function handleCancel() {
    await auth.actions.logout();
    dismiss();
  }

  return (
    <div className={styles.checkEmailModal}>
      <div className={styles.checkEmailModalKeepThisTab}>Keep this tab open</div>
      <div>Use your phone to click the magic words in your email</div>
      <Button className={styles.magicWords}>{phrase}</Button>

      <Button simple onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}
