import * as React from 'react';

const DEFAULT_CONTEXT = null;

export const Context = React.createContext(DEFAULT_CONTEXT);

Context.DEFAULT = DEFAULT_CONTEXT;
