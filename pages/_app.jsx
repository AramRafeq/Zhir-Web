/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ConfigProvider } from 'antd';
import * as ga from '../lib/ga';

import '../styles/vazir.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ConfigProvider direction="rtl">
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
