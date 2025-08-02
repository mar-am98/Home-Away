import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  images : {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: "iqmdgtazzxishmqcqblv.supabase.co"
    },
    {
      protocol: 'https',
      hostname: 'images.pexels.com',
    },
    {
      protocol: 'https',
      hostname: 'img.clerk.com',
    },
  ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
