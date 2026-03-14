import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['tailwindcss'],
  },

  outputFileTracingRoot: path.join(__dirname, '../../'),

  turbopack: {
    root: path.join(__dirname, '../../'),
  },
};

export default nextConfig;
