import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "macvg-games.github.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
