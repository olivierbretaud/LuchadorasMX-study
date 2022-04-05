/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  assetPrefix: './',
  images: {
    domains: ['scontent-ort2-1.xx.fbcdn.net'],
  },
};
