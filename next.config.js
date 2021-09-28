const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  modifyVars: {
    '@primary-color': '#4834d4',
    '@border-radius-base': '7px',
  },
  reactStrictMode: true,
});
