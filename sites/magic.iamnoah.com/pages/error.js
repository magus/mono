import * as Sentry from '@sentry/nextjs';
import { Error } from '@components/Error';
import React from 'react';

Page.disableAuth = true;
Page.title = 'Error';

export default function Page() {
  React.useEffect(() => {
    // client only
    if (!process.browser) return;

    setTimeout(() => {
      throw new Error('purposeful async erorr');
    }, 2000);

    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('purposeful promise error');
      }, 4000);
    });
  }, []);

  return <Error title="Purposeful error" />;
}
