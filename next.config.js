const path = require('path');

module.exports = {
  reactStrictMode: true,
  env: {
    DEEPBRAIN_API_BASE_URL: process.env.NEXT_DEEPBRAIN_API_BASE_URL,
    DEEPBRAIN_SOCKET_SERVER_URL: process.env.NEXT_DEEPBRAIN_SOCKET_SERVER_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
