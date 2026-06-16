/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/creation',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;