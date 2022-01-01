const path = require('path');
const EnvConfig = require('./src/config/env');

// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { withSentryConfig } = require('@sentry/nextjs');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const packages = ['@magusn/react'];
const withTM = require('next-transpile-modules')(packages);

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: `${EnvConfig.PROTOCOL}://${EnvConfig.HOSTNAME}`,
  },
];

const __CONFIG = {
  // withSentryConfig causes crash in serverless functions
  // Error: Cannot find module '/var/task/node_modules/next/dist/server/next.js'. Please verify that the package.json has a valid "main" entry
  // https://github.com/getsentry/sentry-javascript/issues/4103
  // https://github.com/vercel/next.js/issues/30601
  // TODO Remove this once the issues above are resolved
  // https://nextjs.org/docs/advanced-features/output-file-tracing
  outputFileTracing: false,

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // > FORCE=true mono ws magic build
    ignoreDuringBuilds: process.env.FORCE === 'true',
  },

  // --------------------------------------------------
  // withSourceMaps: source maps + sentry configuration
  env: {
    // include all non-secret config constants
    ...EnvConfig,
  },

  // https://securityheaders.com
  async headers() {
    return [
      {
        source: '/',
        headers: securityHeaders,
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
  webpack: (config, options) => {
    // reach out to monorepo root and ensure same version of react
    // see https://www.npmjs.com/package/next-transpile-modules#i-have-trouble-with-duplicated-dependencies-or-the-invalid-hook-call-error-in-react
    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }
    config.resolve.alias['react'] = path.resolve(__dirname, '../../', 'node_modules', 'react');

    // find webpack DefinePlugin and add custom defines
    config.plugins.forEach((plugin) => {
      if (plugin.constructor.name === 'DefinePlugin') {
        plugin.definitions = {
          ...plugin.definitions,
          __DEV__: JSON.stringify(EnvConfig.DEV),
          'process.env.SENTRY_RELEASE': JSON.stringify(options.buildId),
        };
      }
    });

    return config;
  },
};

// see https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  // silent in local dev
  silent: EnvConfig.DEV,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

module.exports = withSentryConfig(withTM(withBundleAnalyzer(__CONFIG)), sentryWebpackPluginOptions);
