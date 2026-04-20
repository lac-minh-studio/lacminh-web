import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroui/react', 'lucide-react'],
  },
  transpilePackages: ['swiper'],
};

export default nextConfig;
