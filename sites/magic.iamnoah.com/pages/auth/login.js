import * as React from 'react';
import { useRouter } from 'next/router';

import Page from 'src/components/Page';
import { Button } from '@magusn/react';
import { MagicAuth } from '@magusn/react/magic-auth';

import styles from 'styles/Login.module.css';

LoginPage.title = 'Login';

export default function LoginPage() {
  const auth = MagicAuth.useAuth();

  // console.debug('[LoginPage]', { auth });

  return (
    <Page className={styles.container}>
      <div className={styles.containerContent}>
        {auth.isLoggedIn ? <Button onClick={auth.actions.logout}>Logout</Button> : <LoginForm />}
      </div>
    </Page>
  );
}

function LoginForm() {
  const auth = MagicAuth.useAuth();
  const [email, set_email] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.email) {
      set_email(router.query.email);
    }
  }, [router.query.email]);

  async function handleSubmit(event) {
    event.preventDefault();

    const { elements } = event.target;
    const email = elements.email.value;

    // make the login API call
    await auth.actions.login(email);
  }

  async function handleInputFocus(event) {
    event.target.setAttribute('type', 'text');
    event.target.setSelectionRange(0, event.target.value.length);
    event.target.setAttribute('type', 'email');
  }

  async function handleEmailInput(event) {
    set_email(event.target.value);
  }

  const buttonStyles = email ? styles.loginButtonEnabled : styles.loginButton;

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          id="email"
          className={styles.loginInput}
          name="email"
          type="email"
          placeholder="magic@gmail.com"
          value={email}
          onFocus={handleInputFocus}
          onChange={handleEmailInput}
        />
        <label htmlFor="email" className={styles.loginLabel}>
          Email
        </label>

        <Button className={buttonStyles}>Login</Button>
      </form>
    </>
  );
}
