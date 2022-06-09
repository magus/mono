import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const title = 'ua reflect';
  const description = props.ua;
  const keywords = ['user agent', 'developer', 'test', 'debug', 'tool'];
  const image = '/ua-reflect.png';

  return (
    <div className={styles.container}>
      <Head>
        <title>ua reflect</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} key="meta:keywords" />

        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uareflect.vercel.app" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="twitter:creator" content="magusnn" />
        <meta property="twitter:creator:id" content="23604692" />
      </Head>

      <main className={styles.main}>
        <code className={styles.title}>{props.ua}</code>
      </main>
    </div>
  );
}

export function getServerSideProps(context) {
  const props = {};
  props.ua = context.req.headers['user-agent'];

  return { props };
}
