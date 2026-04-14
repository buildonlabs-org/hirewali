import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external images if needed
  images: {
    remotePatterns: [],
  },
  // Environment variables available on the client
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};

export default nextConfig;
