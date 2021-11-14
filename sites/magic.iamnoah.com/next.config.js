const packages = ['@magusn/components'];
const withTM = require('next-transpile-modules')(packages);

const config = {
  reactStrictMode: true,
};

module.exports = withTM(config);
