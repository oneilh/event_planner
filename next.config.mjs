/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["192.168.1.240", "192.168.1.240:3000"],
    },
  },
  // Allows hot-reloading (HMR) to work when accessing dev server from your local network IP
  allowedDevOrigins: ["192.168.1.240", "192.168.1.240:3000"],
};

export default nextConfig;
