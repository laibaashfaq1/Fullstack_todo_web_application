// frontend/next.config.js
/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  // Add this if you have custom PostCSS
  experimental: {
    optimizePackageImports: ['tailwindcss'],
  },
  // Add turbopack configuration
  turbopack: {
    root: path.join(__dirname, '../../'),
  },
};

module.exports = nextConfig;