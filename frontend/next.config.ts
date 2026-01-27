// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  // Add this if you have custom PostCSS
  experimental: {
    optimizePackageImports: ['tailwindcss'],
  },
};

module.exports = nextConfig;