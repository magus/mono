import * as React from 'react';
import { Video } from './Video';

export async function getStaticProps() {
  const title = 'video';
  const description = 'download video from url';
  const keywords = ['video', 'download', 'url', 'twitter'];
  const url = 'https://misc.vercel.app/video';
  const favicon = '';
  const image = '';

  const seo = { title, description, keywords, url, favicon, image };

  return { props: { seo } };
}

export function Page() {
  // // SSR
  // if (typeof window === 'undefined') {
  //   return null;
  // }
  // Client
  // return <Video />;

  // SSR + Client
  return <Video />;
}
