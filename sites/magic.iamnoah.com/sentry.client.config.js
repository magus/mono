// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import configureSentry from 'src/config/configureSentry';

const overrides = {
  // do not default integrations, setup manually
  defaultIntegrations: false,
  // client side integrations (default integrations + browser tracing)
  // https://github.com/getsentry/sentry-javascript/blob/4b2d249bfa274de50d96704c2e365c2b488e7eaa/packages/browser/src/sdk.ts
  integrations: [
    // errors
    // easy way to test this is to async fire an error in dev console
    // window.setTimeout(() => { throw new Error('async error') }, 0)
    // https://docs.sentry.io/platforms/javascript/configuration/integrations/default/#globalhandlers
    new Sentry.Integrations.GlobalHandlers(),
    new Sentry.Integrations.TryCatch(),

    new Sentry.Integrations.InboundFilters(),
    new Sentry.Integrations.FunctionToString(),
    new Sentry.Integrations.Breadcrumbs({
      beacon: true, // Log HTTP requests done with the Beacon API
      console: true, // Log calls to `console.log`, `console.debug`, etc
      dom: true, // Log all click and keypress events
      fetch: true, // Log HTTP requests done with the Fetch API
      history: true, // Log calls to `history.pushState` and friends
      sentry: true, // Log whenever we send an event to the server
      xhr: true, // Log HTTP requests done with the XHR API
    }),

    new Sentry.Integrations.LinkedErrors(),
    new Sentry.Integrations.UserAgent(),

    // https://github.com/getsentry/sentry-javascript/blob/master/packages/tracing/src/browser/browsertracing.ts
    new Sentry.Integrations.BrowserTracing(),
  ],
};

Sentry.init(configureSentry(overrides));
