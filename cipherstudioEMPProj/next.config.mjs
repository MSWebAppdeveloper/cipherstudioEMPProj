/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental:{
    serverActions:true,
  },
  reactStrictMode: false,
  swcMinify: true,
};

export default nextConfig;
