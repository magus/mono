// @flow strict
import { useMemo } from 'react';

const noop = () => {};

const ENABLED = process.env.NODE_ENV !== 'production';

export function useLogger(...context) {
  const logger = useMemo(() => {
    const _logger = {
      debug: noop,
      log: noop,
      info: noop,
      warn: noop,
      error: noop,
      table: noop,
      redux: noop,
    };

    if (ENABLED) {
      for (const level of ['debug', 'log', 'info', 'warn', 'error']) {
        _logger[level] = (...args) => {
          console[level](...context, ...args);
        };
      }
    }

    _logger.table = (data) => {
      if (ENABLED) {
        // $FlowFixMe: ConsoleTableArg is copied directly from /private/tmp/flow/flowlib_2fd0d9f42c28b9ff_501/core.js
        console.table(data);
      }
    };

    _logger.redux = (...args) => {
      _logger.info(...context, ...args);
    };

    return _logger;

    // context is a dynamic array, exclude or it will endlessly re-memoize
    // this will freeze the initial context for use by the logger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return logger;
}
