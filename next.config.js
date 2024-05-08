/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    deviceSizes: [430, 768, 1024],
    imageSizes: [430, 676, 1024],
  },
  async redirects() {
    return [
      {
        // ?p=news%2Fcornelius-t%C3%B8ndel-interview-leatt-rider'
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
