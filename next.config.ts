import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [{ source: "/testimoni", destination: "/kontak", permanent: true }];
  },
};

export default nextConfig;
