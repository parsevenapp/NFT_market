/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.ipfscdn.io", "ipfs.io"], // اجازه بارگذاری تصاویر از پروتکل IPFS
  },
};

module.exports = nextConfig;
