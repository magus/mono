import { GraphQLClient } from 'graphql-request';

import config from './config';

const endpoint = 'https://magic-graphql.iamnoah.com/v1/graphql';
const client = new GraphQLClient(endpoint);

async function query(gql, { headers, variables }) {
  return await client.request(gql, variables, {
    'x-hasura-admin-secret': config.HASURA_ADMIN_SECRET,
    ...headers,
  });
}

const module = { query };
export default module;
