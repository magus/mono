export { default } from '../mac-dock';

export function getStaticProps() {
  const title = 'mac dock';
  const description = 'a mac dock because we can';
  const keywords = [];
  const url = 'https://misc-noah.vercel.app/test/landscape-image';
  const favicon = '/mac-dock/favicon.png';
  const image = 'https://misc-noah.vercel.app/mac-dock/landscape-test-image.jpg';

  const seo = { title, description, keywords, url, favicon, image };

  return { props: { seo } };
}
