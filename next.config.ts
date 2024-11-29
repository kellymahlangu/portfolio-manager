import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/",
      },
    ],
  },
};
const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
