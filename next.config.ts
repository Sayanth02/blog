import type { NextConfig } from "next";

const nextConfig: NextConfig & { eslint?: { ignoreDuringBuilds?: boolean } } = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Do not fail the production build on ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Do not fail the production build on TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
