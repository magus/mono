export default function configureSentry(overrides) {
  const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  // https://docs.sentry.io/clients/javascript/config/
  const sentryOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps

    dsn: SENTRY_DSN || 'https://8a5fc1e07b4f49cea19f8151261a1788@o502635.ingest.sentry.io/5585227',

    ignoreErrors: [
      // string or regex to match error message
    ],

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    maxBreadcrumbs: 50,
    attachStacktrace: true,
  };

  // When we're developing locally
  if (__DEV__) {
    // The before-send callback is passed both the event and a second argument, hint, that holds one or more hints.
    // Typically a hint holds the original exception so that additional data can be extracted or grouping is affected.
    // https://docs.sentry.io/platforms/javascript/configuration/filtering/#using-beforesend
    sentryOptions.beforeSend = function custom_beforeSend(event, hint) {
      // Don't actually send the errors to Sentry
      // Instead, dump the errors to the console
      console.debug('[SentryConfig]', 'beforeSend', { event, hint });
      return null;
    };
  }

  // apply overrides specified in args to sentryOptions
  Object.assign(sentryOptions, overrides);

  return sentryOptions;
}
