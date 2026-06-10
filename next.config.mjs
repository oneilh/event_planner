/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["192.168.1.240", "192.168.1.240:3000"],
    },
  },
};

export default nextConfig;
