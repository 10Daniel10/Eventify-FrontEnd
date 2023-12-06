// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/eventify-bucket/**',
      },
    ],
  },
};