import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ConfigProvider } from 'antd';
import { hydrate } from 'react-dom';
import App from './App';

hydrate(
  <BrowserRouter>
    <ConfigProvider direction="rtl">
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
