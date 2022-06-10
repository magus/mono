import * as React from 'react';
import styled from 'styled-components';

import graphql from '../graphql/queries';
import { useMagicAuth } from '../useMagicAuth';
import { Button } from '../../components/Button';

export function CheckEmailModal({ dismiss, jwtToken, phrase }) {
  const auth = useMagicAuth();
  const approved = graphql.watchLoginRequest(jwtToken);
  const locals = React.useRef({ is_completeLogin: false });

  React.useEffect(() => {
    if (approved && !locals.current.is_completeLogin) {
      locals.current.is_completeLogin = true;
      auth.actions.completeLogin();
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
    <Container>
      <KeepThisTab>Keep this tab open</KeepThisTab>
      <div>Use your phone to click the magic words in your email</div>

      <MagicWords>{phrase}</MagicWords>
      <Button simple onClick={handleCancel}>
        Cancel
      </Button>
    </Container>
  );
}

const Container = styled.div`
  max-width: 80%;
  min-width: 320px;
  max-height: 80%;
  min-height: 320px;
  background-color: rgba(var(--background-color), 1);
  border-radius: var(--spacer);
  padding: var(--spacer-3);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const KeepThisTab = styled.div`
  font-weight: 800;
  font-size: var(--font-large);
  margin: 0 0 var(--spacer) 0;
`;

const MagicWords = styled(Button)`
  margin: var(--spacer-4) 0;
`;
