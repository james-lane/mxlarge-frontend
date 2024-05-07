/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    deviceSizes: [430, 768, 1024],
    imageSizes: [430, 676, 1024],
  },
};

module.exports = nextConfig;
