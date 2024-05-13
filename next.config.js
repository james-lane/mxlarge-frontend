/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [768, 1024, 2048],
    imageSizes: [330],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/8oyzogbt/production/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
