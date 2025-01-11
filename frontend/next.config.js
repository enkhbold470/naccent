import withPWA from "next-pwa"
import runtimeCaching from "next-pwa/cache.js"

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ...pwaConfig,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
    ],
  },
}
// module.exports = withPWA(nextConfig);

export default nextConfig
