import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { Button, MagicAuth } from '@magusn/react';

export default function DeleteSession({ id, onDelete, onError, buttonTitle, buttonTitleDeleting }) {
  const [deleteSession, { called, error }] = useMutation(deleteLoginToken, {
    variables: { id },
    context: {
      headers: {
        [MagicAuth.HEADERS.role]: MagicAuth.ROLES.self,
      },
    },
  });

  React.useEffect(() => {
    if (error) {
      onError(id);
    }
  }, [error]);

  async function handleDeleteSession() {
    onDelete(id);
    deleteSession();
    // // simulate error
    // setTimeout(() => {
    //   onError(id);
    // }, 2000);
  }

  const title = called && !error ? buttonTitleDeleting : buttonTitle;

  return (
    <Button simple title={title} onClick={handleDeleteSession} style={{ fontSize: 20 }}>
      {called && !error ? '⏳' : '❌'}
    </Button>
  );
}

const deleteLoginToken = gql`
  mutation DeleteLoginToken($id: uuid!) {
    delete_loginToken_by_pk(id: $id) {
      id
    }
  }
`;
