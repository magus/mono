import * as React from 'react';
import * as Sentry from '@sentry/nextjs';
import NextApp from 'next/app';
import dynamic from 'next/dynamic';

import { Error } from '@components/Error';
import LoginGateCover from '@components/LoginGate/LoginGateCover';

const DynamicApp = dynamic(
  () =>
    import(
      /* webpackChunkName: "DynamicApp" */
      /* webpackPrefetch: true */
      './App'
    ),
  {
    loading: LoginGateCover,
  },
);

export default class MyApp extends NextApp {
  static getDerivedStateFromProps(props, state) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined,
    };
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true };
  }

  constructor() {
    super(...arguments);

    this._errorEventId = null;

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.debug('componentDidCatch', { error, errorInfo });

    const errorEventId = Sentry.captureException(error, {
      errorInfo,
      errorSource: 'componentDidCatch',
    });

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    // `SentryConfig.Sentry.showReportDialog` can be used to manually send errors
    // e.g. SentryConfig.Sentry.showReportDialog({ eventId: this.state.errorEventId });
    this._errorEventId = errorEventId;
  }

  render() {
    if (this.state.hasError) {
      return <Error statusCode="Oops" title="Something went wrong, please reload the page." />;
    }

    return <DynamicApp {...this.props} />;
  }
}
