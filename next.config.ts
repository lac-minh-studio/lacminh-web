import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    inlineCss: true,
    optimizeCss: true,
    optimizePackageImports: ['@heroui/react', 'lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 65, 75],
  },
  transpilePackages: ['swiper'],
};

export default nextConfig;
