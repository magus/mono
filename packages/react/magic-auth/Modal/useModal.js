import * as React from 'react';

import { ModalContext } from './ModalContext';

export function useModal() {
  const modal = React.useContext(ModalContext);

  if (modal === ModalContext.DEFAULT) {
    throw new Error('<ModalContextProvider> must be included in React tree');
  }

  return modal;
}
