import * as React from 'react';

import { Context } from './Context';

export function useMagicAuth() {
  const auth = React.useContext(Context);

  if (auth === Context.DEFAULT) {
    throw new Error('<MagicAuthProvider> must be included in React tree');
  }

  return auth;
}
