// frontend/next.config.js
/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['tailwindcss'],
    outputFileTracingRoot: path.join(__dirname, '../../'), // Explicitly set output file tracing root
  },
  turbopack: {
    root: path.join(__dirname, '../../'),
  },
};

module.exports = nextConfig;