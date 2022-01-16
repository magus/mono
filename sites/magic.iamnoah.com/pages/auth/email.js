import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { expiresMinutesDuration } from 'src/server/time';

import { Button } from '@magusn/react';

AuthEmail.disableAuth = true;

export default function AuthEmail() {
  const router = useRouter();
  const {
    email = 'test@test.com',
    loginConfirmUrl = 'https://domain.com/api/blah/blah',
    phrase = 'testy tester',
    // e.g. http://localhost:3000/auth/email?expireMinutes=676
    expireMinutes = 60 * 2,
  } = router.query;

  const expiresIn = expiresMinutesDuration(expireMinutes);

  return (
    <Table cellPadding="0" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td>
            <Paragraph>
              Click the magic words below to login as <Email>{email}</Email>.
              <br />
              The magic words will only work for the next {expiresIn}.
            </Paragraph>
          </td>
        </tr>

        <tr>
          <td>
            <Button href={loginConfirmUrl}>{phrase}</Button>
          </td>
        </tr>

        <tr>
          <td>
            <Paragraph>Ensure the magic words match what you saw on the login page.</Paragraph>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  max-width: 450px;
  text-align: left;
`;

const Email = styled.span`
  font-weight: 700;
`;

const Paragraph = styled.span`
  display: inline-block;
  padding: var(--spacer-2) 0;
`;
