import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/icon.png",
      },
      {
        pathname: "/api/files/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
