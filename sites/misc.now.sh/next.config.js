const packages = ['@magusn/react'];
const withTM = require('next-transpile-modules')(packages);

module.exports = withTM({
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even with eslint errors
    // > FORCE=true mono ws arceus deploy:prod
    ignoreDuringBuilds: process.env.FORCE === 'true',
  },
});
