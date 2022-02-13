import Script from 'next/script';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

// https://www.joshwcomeau.com/css/custom-css-reset/
const CSSReset = createGlobalStyle`
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}
`;

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: 249, 109, 16;
    --secondary-color: 35, 181, 211;
    --white: 255, 255, 255;
    --black: 0, 0, 0;
    --dark-blue: 9, 4, 70;
    --gray: 154, 158, 163;
    --green: 16, 185, 129;

    --spacer: 8px;
    --spacer-1: var(--spacer);
    --spacer-2: calc(var(--spacer) * 2);
    --spacer-3: calc(var(--spacer) * 3);
    --spacer-4: calc(var(--spacer) * 4);
    --spacer-5: calc(var(--spacer) * 5);
    --spacer-6: calc(var(--spacer) * 6);
    --spacer-7: calc(var(--spacer) * 7);
    --spacer-8: calc(var(--spacer) * 8);

    --font-small: 14px;
    --font-normal: 16px;
    --font-large: 20px;
    --font-jumbo: 64px;

    --background-color: var(--white);
    --font-color: var(--black);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background-color: var(--black);
      --font-color: var(--white);
    }
  }

  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
    font-size: 16px;
    background: rgba(var(--background-color), 1);
    color: rgba(var(--font-color), 1);
  }

  html,
  body,
  #__next {
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

export default function MyApp({ Component, pageProps }) {
  const title = 'Pokédex';
  const description = 'Pokedex for Pokémon Legends: Arceus';

  return (
    <>
      <Head>
        <title>{title}</title>

        {/* seo & open graph tags */}
        <meta name="description" content={description} />
        <meta name="keywords" content={['pokemon', 'pokedex', 'arceus', 'legends', 'search', 'game'].join(', ')} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://arceus.vercel.app`} />
        {/* <meta
          property="og:image"
          content={`https://arceus.vercel.app/images/demo.8cfb8bec6712b5681f3efafc8030b71e.jpeg`}
        /> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="magusnn" />
        <meta property="twitter:creator:id" content="23604692" />

        {/* favicons */}
        <link rel="icon" href="/pokeball.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e4000f" />
        <meta name="msapplication-TileColor" content="#ffcb05" />
        <meta name="theme-color" content="#ffcb05" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>

      {/*
        https://analytics.google.com/analytics/web/#/a220208968p303425978/admin/streams/table/3244475711
        https://nextjs.org/docs/messages/next-script-for-ga
      */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-W91B3WXL9M" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {GOOGLE_TAG_MANAGER}
      </Script>

      <CSSReset />
      <GlobalStyle />

      <Component {...pageProps} />
    </>
  );
}

const GOOGLE_TAG_MANAGER = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-W91B3WXL9M');
`;
