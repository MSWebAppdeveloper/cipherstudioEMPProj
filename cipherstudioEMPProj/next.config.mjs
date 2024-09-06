/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental:{
    serverActions:true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
