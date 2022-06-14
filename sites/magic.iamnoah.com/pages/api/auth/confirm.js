import gql from 'graphql-tag';

import graphql from 'src/server/graphql';
import * as ServerHandler from '../../../src/server/handler';

const checkMethod = ServerHandler.method(['GET']);

const loginConfirmUrl = `${process.env.PROTOCOL}://${process.env.HOSTNAME}/auth/confirm`;

export default async function loginConfirm(req, res) {
  try {
    checkMethod(req);

    const { id, token } = req.query;

    // the query to approve takes in the login request id and also the secret (token)
    // both must match in order to approve the login request
    const data = await graphql.query(approveLoginToken, {
      variables: {
        id,
        secret: token,
      },
    });

    // if the login token is not found (secret or id are wrong)
    if (data.loginToken.affected_rows === 0) {
      throw new Error('login token invalid, try again');
    }

    const [loginToken] = data.loginToken.returning;

    // verify loginToken not expired
    if (Date.now() > new Date(loginToken.expires).getTime()) {
      throw new Error('login token expired, try again');
    }

    // client will then be able to hit /auth/login/complete
    // which will hit server and write refresh token

    // return res.status(200).json({ error: false });
    // res.setHeader('Content-Type', 'text/html');
    // return res.status(200).send(`
    //   <html>
    //     <head>
    //       <meta http-equiv="Refresh" content="0; URL=${loginConfirmUrl}">
    //     </head>
    //   </html>
    // `);
    return res.status(302).redirect(`${loginConfirmUrl}?email=${loginToken.email}`);
  } catch (e) {
    console.error(e);

    return res.status(400).json({ error: true, message: e.message, stack: e.stack.split('\n') });
  }
}

const approveLoginToken = gql`
  mutation ApproveLoginToken($id: uuid!, $secret: String!) {
    loginToken: update_loginToken(where: { id: { _eq: $id }, secret: { _eq: $secret } }, _set: { approved: true }) {
      affected_rows
      returning {
        expires
        email
      }
    }
  }
`;
