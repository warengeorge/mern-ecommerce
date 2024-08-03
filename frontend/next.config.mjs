/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
      protocol: 'https',
      hostname: 's3.amazonaws.com'
      }
    ]
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  }
};


export default nextConfig;