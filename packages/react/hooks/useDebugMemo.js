// @flow strict
import * as React from 'react';
import { useLogger } from './useLogger';

const ENABLED = process.env.NODE_ENV !== 'production';

export function useDebugMemo(values, logDirtyOnly = true) {
  const logger = useLogger('useDebugMemo');

  const i = React.useRef(0);
  const storedValues = React.useRef(values);

  // Intentional useEffect without dependencies
  // We want this to run on every pass
  React.useEffect(() => {
    if (!ENABLED) return;

    if (i.current !== 0) {
      const changes = {};
      let dirty = false;

      const names = Object.keys(values);
      names.forEach((name) => {
        const previous = storedValues.current[name];
        const current = values[name];
        const update = previous !== current;

        if (update) {
          dirty = true;
        }

        changes[name] = {
          name,
          update,
          previous,
          current,
        };
      });

      if (logDirtyOnly && dirty) {
        // which are new? unchanged? etc.
        logger.debug(`Changes (${i.current})`);
        logger.table(changes);
      }
    }

    // update stored values after each pass
    storedValues.current = values;
    i.current = i.current + 1;
  });
}
