import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/testimoni", destination: "/kontak", permanent: true },
      { source: "/bio", destination: "/links", permanent: true },
      { source: "/link", destination: "/links", permanent: true },
    ];
  },
};

export default nextConfig;
