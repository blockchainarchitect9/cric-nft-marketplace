/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["tan-top-tiglon-899.mypinata.cloud","cric-nft-marketplace.vercel.app"],
  },
};

module.exports = nextConfig;
