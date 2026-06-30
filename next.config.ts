import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "cursorgenerator.dev",
          },
        ],
        destination: "https://www.cursorgenerator.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
