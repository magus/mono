import * as React from 'react';

export function usePageVisibility(onVisibilityChange) {
  // init with a page visiblity listener
  React.useEffect(() => {
    if (!process.browser) return;
    if (typeof onVisibilityChange !== 'function') return;

    function handleVisibilityChange() {
      const { visibilityState } = document;
      const isVisible = visibilityState === Visibility.visible;

      onVisibilityChange(isVisible);

      // console.debug('usePageVisibility', 'handleVisibilityChange', {
      //   visibilityState,
      //   isVisible,
      // });
    }

    // console.debug('usePageVisibility', 'setup');
    document.addEventListener(eventName, handleVisibilityChange, false);

    return function cleanup() {
      // console.debug('usePageVisibility', 'cleanup');
      document.removeEventListener(eventName, handleVisibilityChange, false);
    };
  }, [onVisibilityChange]);
}

const eventName = 'visibilitychange';

const Visibility = {
  visible: 'visible',
  hidden: 'hidden',
};
