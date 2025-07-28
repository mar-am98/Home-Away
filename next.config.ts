import type { NextConfig } from "next";
import { hostname } from "os";

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
  }
};

export default nextConfig;
