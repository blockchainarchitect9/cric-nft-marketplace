/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "tan-top-tiglon-899.mypinata.cloud",
      "cric-nft-marketplace.vercel.app",
      "api.pinata.cloud",
      "eth-sepolia.g.alchemy.com",
    ],
  },
};

module.exports = nextConfig;
