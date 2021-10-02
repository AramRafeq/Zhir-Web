/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ConfigProvider } from 'antd';
import '../styles/vazir.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider direction="rtl">
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
