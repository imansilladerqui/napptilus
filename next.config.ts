import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src"],
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prueba-tecnica-api-tienda-moviles.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.apple.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
