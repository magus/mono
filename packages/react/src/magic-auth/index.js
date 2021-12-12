import { useMagicAuth } from './useMagicAuth';
import { MagicAuthProvider } from './MagicAuthProvider';

import { HEADERS } from './graphql/Headers';
import { ROLES } from './graphql/Roles';
import graphql from './graphql/queries';

export const MagicAuth = {
  HEADERS,
  ROLES,
  graphql,
  useAuth: useMagicAuth,
  Provider: MagicAuthProvider,
};
