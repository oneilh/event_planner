import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.240"],
};

// Force Next.js dev server restart to clear Prisma client cache
export default nextConfig;
