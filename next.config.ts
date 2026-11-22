import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev uniquement : autorise l'accès depuis un téléphone sur le réseau local
  // (ex : http://192.168.1.175:3000). Sans cela, le JavaScript est bloqué et
  // les éléments interactifs (menu mobile, formulaire…) ne répondent pas.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
