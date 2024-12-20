/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [1024, 2048],
    imageSizes: [430, 676],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/8oyzogbt/production/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/8oyzogbt/stub/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/(\\w+.php)',
        destination: '/',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/',
        permanent: true,
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
