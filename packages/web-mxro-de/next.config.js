/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const withPlugins = require('next-compose-plugins');
const images = require('next-images');

const nextConfig = {
  webpack: (config, options) => {
    return config;
  },
  eslint: {
    // ESLint managed on the workspace level
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true,
  },
};

const config = withPlugins([[images]], nextConfig);

module.exports = config;
