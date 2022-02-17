module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['www.serebii.net'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even with eslint errors
    // > FORCE=true mono ws arceus deploy:prod
    ignoreDuringBuilds: process.env.FORCE === 'true',
  },
};
