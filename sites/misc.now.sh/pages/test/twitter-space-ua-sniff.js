import * as React from 'react';
import Head from 'next/head';

export default function Page(props) {
  // simulate rweb ssr
  // if we do not recognize a bot then do nothing
  if (!props.is_whatsapp) {
    return null;
  }

  // bot recognized, return meta tags

  return (
    <Head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
      />
      <link rel="preconnect" href="//abs.twimg.com" />
      <link rel="dns-prefetch" href="//abs.twimg.com" />
      <link rel="preconnect" href="//api.twitter.com" />
      <link rel="dns-prefetch" href="//api.twitter.com" />
      <link rel="preconnect" href="//pbs.twimg.com" />
      <link rel="dns-prefetch" href="//pbs.twimg.com" />
      <link rel="preconnect" href="//t.co" />
      <link rel="dns-prefetch" href="//t.co" />
      <link rel="preconnect" href="//video.twimg.com" />
      <link rel="dns-prefetch" href="//video.twimg.com" />
      <meta property="fb:app_id" content="2231777543" />
      <meta property="og:site_name" content="Twitter" />
      <meta name="google-site-verification" content="acYOOcR5z6puMzLn6hLDZI1nNHXPxt57OIstz1vnCV0" />
      <meta name="facebook-domain-verification" content="x6sdcc8b5ju3bh8nbm59eswogvg6t1" />
      <meta
        httpEquiv="onion-location"
        content="https://twitter3e4tixl4xyajtrzo62zg5vztmjuricljdp2c5kshju4avyoid.onion/"
      />
      <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
      <link rel="alternate" hrefLang="x-default" href="https://twitter.com/i/spaces/1OyKADyWoPaxb" />
      <link rel="alternate" hrefLang="en" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=en" />
      <link rel="alternate" hrefLang="ar" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ar" />
      <link rel="alternate" hrefLang="ar-x-fm" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ar-x-fm" />
      <link rel="alternate" hrefLang="bg" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=bg" />
      <link rel="alternate" hrefLang="bn" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=bn" />
      <link rel="alternate" hrefLang="ca" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ca" />
      <link rel="alternate" hrefLang="cs" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=cs" />
      <link rel="alternate" hrefLang="da" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=da" />
      <link rel="alternate" hrefLang="de" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=de" />
      <link rel="alternate" hrefLang="el" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=el" />
      <link rel="alternate" hrefLang="en-GB" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=en-GB" />
      <link rel="alternate" hrefLang="es" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=es" />
      <link rel="alternate" hrefLang="eu" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=eu" />
      <link rel="alternate" hrefLang="fa" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=fa" />
      <link rel="alternate" hrefLang="fi" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=fi" />
      <link rel="alternate" hrefLang="fr" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=fr" />
      <link rel="alternate" hrefLang="ga" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ga" />
      <link rel="alternate" hrefLang="gl" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=gl" />
      <link rel="alternate" hrefLang="gu" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=gu" />
      <link rel="alternate" hrefLang="he" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=he" />
      <link rel="alternate" hrefLang="hi" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=hi" />
      <link rel="alternate" hrefLang="hr" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=hr" />
      <link rel="alternate" hrefLang="hu" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=hu" />
      <link rel="alternate" hrefLang="id" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=id" />
      <link rel="alternate" hrefLang="it" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=it" />
      <link rel="alternate" hrefLang="ja" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ja" />
      <link rel="alternate" hrefLang="kn" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=kn" />
      <link rel="alternate" hrefLang="ko" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ko" />
      <link rel="alternate" hrefLang="mr" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=mr" />
      <link rel="alternate" hrefLang="ms" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ms" />
      <link rel="alternate" hrefLang="nb" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=nb" />
      <link rel="alternate" hrefLang="nl" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=nl" />
      <link rel="alternate" hrefLang="pl" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=pl" />
      <link rel="alternate" hrefLang="pt" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=pt" />
      <link rel="alternate" hrefLang="ro" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ro" />
      <link rel="alternate" hrefLang="ru" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ru" />
      <link rel="alternate" hrefLang="sk" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=sk" />
      <link rel="alternate" hrefLang="sr" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=sr" />
      <link rel="alternate" hrefLang="sv" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=sv" />
      <link rel="alternate" hrefLang="ta" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ta" />
      <link rel="alternate" hrefLang="th" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=th" />
      <link rel="alternate" hrefLang="tr" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=tr" />
      <link rel="alternate" hrefLang="uk" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=uk" />
      <link rel="alternate" hrefLang="ur" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=ur" />
      <link rel="alternate" hrefLang="vi" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=vi" />
      <link rel="alternate" hrefLang="zh" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=zh" />
      <link rel="alternate" hrefLang="zh-Hant" href="https://twitter.com/i/spaces/1OyKADyWoPaxb?lang=zh-Hant" />
      <link rel="canonical" href="https://twitter.com/i/spaces/1OyKADyWoPaxb" />
      <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Twitter" />
      <link rel="shortcut icon" href="//abs.twimg.com/favicons/twitter.2.ico" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Twitter" />
      <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        httpEquiv="origin-trial"
        content="AlpCmb40F5ZjDi9ZYe+wnr/V8MF+XmY41K4qUhoq+2mbepJTNd3q4CRqlACfnythEPZqcjryfAS1+ExS0FFRcA8AAABmeyJvcmlnaW4iOiJodHRwczovL3R3aXR0ZXIuY29tOjQ0MyIsImZlYXR1cmUiOiJMYXVuY2ggSGFuZGxlciIsImV4cGlyeSI6MTY1NTI1MTE5OSwiaXNTdWJkb21haW4iOnRydWV9"
      />
      <meta data-rh="true" content="website" property="og:type" />
      <meta data-rh="true" content="https://twitter.com/i/spaces/1OyKADyWoPaxb" property="og:url" />
      <meta data-rh="true" content="Play recording: Spaces community gathering + Q&amp;A" property="og:title" />
      <meta data-rh="true" content="Spaces’s space · Where live audio conversations happen" property="og:description" />
      <meta
        data-rh="true"
        content="https://abs.twimg.com/sticky/cards/TwitterSpacesCardImage.3.jpg"
        property="og:image"
      />
      <meta data-rh="true" content="image/jpeg" property="og:image:type" />
      <meta data-rh="true" content="1200" property="og:image:width" />
      <meta data-rh="true" content="630" property="og:image:height" />
      <meta data-rh="true" content="Twitter Spaces" property="og:image:alt" />
      <meta data-rh="true" content="86400" property="og:ttl" />
      <meta data-rh="true" content="Play recording: Spaces community gathering + Q&amp;A" name="title" />
      <meta data-rh="true" content="Spaces’s space · Where live audio conversations happen" name="description" />

      <title data-rh="true">Play recording: Spaces community gathering + Q&amp;A</title>
    </Head>
  );
}

export function getServerSideProps(context) {
  const props = {};
  props.is_whatsapp = /whatsapp/i.test(context.req.headers['user-agent']);

  return { props };
}
