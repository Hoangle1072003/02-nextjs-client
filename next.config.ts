import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "salt.tikicdn.com",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        search: "",
      },
    ],
  },
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
