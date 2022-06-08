import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ua reflect</title>
        <meta name="title" content="ua reflect" />
        <meta name="description" content={props.ua} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{props.ua}</h1>
      </main>
    </div>
  );
}

export function getServerSideProps(context) {
  const props = {};
  props.ua = context.req.headers['user-agent'];

  return { props };
}
