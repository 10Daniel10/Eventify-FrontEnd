// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eventify-bucket.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};