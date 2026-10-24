import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Writing lives in the Writing & Philosophy collection; the old addresses lead there.
  async redirects() {
    const to = "/collections/writing-and-philosophy";
    return [
      { source: "/writing", destination: to, permanent: false },
      ...["poetry", "creative-writing", "analysis"].map((s) => ({ source: `/writing/${s}`, destination: `${to}#${s}`, permanent: false })),
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
