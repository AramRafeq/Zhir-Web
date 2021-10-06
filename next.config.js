const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({

  eslint: {
    ignoreDuringBuilds: true,
  },
  modifyVars: {
    '@primary-color': '#892CDC',
    '@border-radius-base': '5px',
  },
  reactStrictMode: true,
});
