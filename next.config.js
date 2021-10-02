const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  modifyVars: {
    '@primary-color': '#892CDC',
    '@border-radius-base': '5px',
  },
  reactStrictMode: true,
});
