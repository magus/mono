import * as React from 'react';

const DEFAULT_CONTEXT = null;
export const ModalContext = React.createContext(DEFAULT_CONTEXT);
ModalContext.DEFAULT = DEFAULT_CONTEXT;
