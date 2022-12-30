import * as React from 'react';
import { Hades } from './Hades';

export function getStaticProps() {
  const title = 'hades';
  const description = 'useful tools for hades';
  const keywords = ['hades', 'game', 'tools', 'eurydice'];
  const url = 'https://misc.vercel.app/hades';
  const favicon = '';
  const image = '';

  const seo = { title, description, keywords, url, favicon, image };

  return { props: { seo } };
}

export function Page() {
  // SSR
  if (typeof window === 'undefined') {
    return null;
  }

  // Client
  return <Hades />;
}
