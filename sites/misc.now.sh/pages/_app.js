import * as React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Router from 'next/router';
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
  min-height: 100%;
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
    --main-color: 255, 203, 5;
    --main-color-light: 254, 243, 199;
    --dark-blue: 30, 64, 175;
    --gray: 161, 161, 170;
    --white: 255, 255, 255;
    --black: 0, 0, 0;

    --spacer: 8px;
    --spacer-d4: calc(var(--spacer) / 4);
    --spacer-d2: calc(var(--spacer) / 2);
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
    font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif;
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
    padding: 0;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }
`;

const SVG = (emoji) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

export default function MyApp({ Component, pageProps }) {
  const title = pageProps?.seo?.title || 'misc';
  const description = pageProps?.seo?.description || 'just random things';
  const keywords = pageProps?.seo?.keywords || ['misc', 'random', '???', 'demo'];
  const url = pageProps?.seo?.url || 'https://misc.vercel.app';
  const favicon = pageProps?.seo?.favicon || SVG('🤔');
  const image = pageProps?.seo?.image || '';

  return (
    <>
      <Head>
        <title key="title">{title}</title>

        {/* seo & open graph tags */}
        <meta name="description" content={description} key="meta:description" />
        <meta name="keywords" content={keywords.join(', ')} key="meta:keywords" />
        <meta property="og:locale" content="en_US" key="meta:og:locale" />
        <meta property="og:title" content={title} key="meta:og:title" />
        <meta property="og:description" content={description} key="meta:og:description" />
        <meta property="og:type" content="website" key="meta:og:type" />
        <meta property="og:url" content={url} key="meta:og:url" />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="magusnn" />
        <meta property="twitter:creator:id" content="23604692" />

        {/* favicons */}
        <link rel="icon" href={favicon} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>

      <GoogleTagManager id="Z0P7EH3L6R" />

      <CSSReset />
      <GlobalStyle />

      <ScrollRestoration />

      <Component {...pageProps} />
    </>
  );
}

function ScrollRestoration() {
  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';

    let currentUrl = null;
    let isHistoryNavigation = false;
    const cachedScroll = {};

    Router.beforePopState(() => {
      isHistoryNavigation = true;

      // must return true to allow nextjs to handle navigation
      // https://nextjs.org/docs/api-reference/next/router#routerbeforepopstate
      return true;
    });

    function handle_routeChangeStart() {
      if (currentUrl && (window.scrollX || window.scrollY)) {
        cachedScroll[currentUrl] = [window.scrollX, window.scrollY];
        // alert(['[ScrollRestoration]', 'caching', currentUrl, cachedScroll[currentUrl]].join(' '));
      } else {
        // this is the first route on page load, just record it
        currentUrl = [window.location.pathname, window.location.search].join('');
      }
    }

    function handle_routeChangeComplete(url) {
      currentUrl = url;

      const scrollData = cachedScroll[url];

      if (isHistoryNavigation && scrollData) {
        isHistoryNavigation = false;
        setTimeout(() => {
          // alert(['[ScrollRestoration]', 'restoring', url, scrollData].join(' '));
          const [x, y] = scrollData;
          window.scrollTo(x, y);
        }, 100);
      }
    }

    Router.events.on('routeChangeStart', handle_routeChangeStart);
    Router.events.on('routeChangeComplete', handle_routeChangeComplete);

    return function cleanup() {
      Router.events.off('routeChangeStart', handle_routeChangeStart);
      Router.events.off('routeChangeComplete', handle_routeChangeComplete);
    };
  }, []);

  return null;
}

// https://analytics.google.com/analytics/web/#/a227517963p313391768/admin/streams/table/3535227943
// https://nextjs.org/docs/messages/next-script-for-ga
function GoogleTagManager(props) {
  const dataLayerScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-${props.id}');
`;

  const scriptSource = `https://www.googletagmanager.com/gtag/js?id=G-${props.id}`;

  return (
    <React.Fragment>
      <Script src={scriptSource} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {dataLayerScript}
      </Script>
    </React.Fragment>
  );
}
