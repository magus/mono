import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Spacer } from '@magusn/react';

import Page from 'src/components/Page';
import { Button } from '@magusn/react';
import { MagicAuth } from '@magusn/react/magic-auth';

LoginPage.title = 'Login';

export default function LoginPage() {
  const auth = MagicAuth.useAuth();

  // console.debug('[LoginPage]', { auth });

  return (
    <Page>
      <Spacer vertical size={6} />

      <Content>{auth.isLoggedIn ? <Button onClick={auth.actions.logout}>Logout</Button> : <LoginForm />}</Content>
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

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <LoginInput
          id="email"
          name="email"
          type="email"
          placeholder="magic@gmail.com"
          value={email}
          onFocus={handleInputFocus}
          onChange={handleEmailInput}
        />

        <Spacer vertical px={1} />

        <EmailLabel htmlFor="email">Email</EmailLabel>

        <Button disabled={!email}>Login</Button>
      </StyledForm>
    </>
  );
}

const Content = styled.div`
  height: 100%;
  width: 100%;
  max-width: 480px;
  min-width: 320px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmailLabel = styled.label`
  visibility: hidden;
  align-self: flex-start;
  font-size: var(--font-small);
`;

const LoginInput = styled.input`
  width: 100%;
  height: var(--button-height);
  border: 1px solid rgba(var(--font-color), 0.4);
  border-radius: var(--spacer);
  padding: var(--spacer) var(--spacer-2);

  &::placeholder {
    color: rgba(var(--font-color), 0.25);
  }
`;
