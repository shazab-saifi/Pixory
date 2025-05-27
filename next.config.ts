import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/videos/**'
      }
    ]
  }
};

export default nextConfig;
