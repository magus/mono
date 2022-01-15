import * as React from 'react';

import { ModalContext } from './ModalContext';

export function ModalContextProvider({ children }) {
  const [config, set_config] = React.useState({ component: null });

  function open(component, config) {
    set_config({ component, ...config });
  }

  function close() {
    set_config({ component: null });
  }

  const value = {
    isOpen: config.component !== null,
    config,
    open,
    close,
  };

  return <ModalContext.Provider {...{ value }}>{children}</ModalContext.Provider>;
}
