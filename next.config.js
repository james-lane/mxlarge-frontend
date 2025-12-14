/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image config removed - not needed when all images use unoptimized prop
  // All images are pre-optimized via Sanity CDN
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
