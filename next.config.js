/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/404',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
