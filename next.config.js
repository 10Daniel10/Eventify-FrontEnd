// next.config.js
module.exports = {
  transpilePackages: ['@mui/x-charts'],
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