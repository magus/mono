import { useMagicAuth } from './useMagicAuth';
export { MagicAuthProvider } from './MagicAuthProvider';

import { HEADERS } from './graphql/Headers';
import { ROLES } from './graphql/Roles';
export { default as MagicAuthGraphql } from './graphql/queries';

export const MagicAuth = {
  HEADERS,
  ROLES,
  useAuth: useMagicAuth,
};
