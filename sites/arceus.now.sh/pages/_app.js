import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokédex</title>
        <meta name="description" content="Pokedex for Pokémon Legends: Arceus" />
        <link rel="icon" href="/pokeball.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e4000f" />
        <meta name="msapplication-TileColor" content="#ffcb05" />
        <meta name="theme-color" content="#ffcb05" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
