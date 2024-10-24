/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "joyfoodsunshine.com",
      },
      {
        protocol: "https",
        hostname: "icookfortwo.com",
      },
      {
        protocol: "https",
        hostname: "i1.wp.com",
      },
      {
        protocol: "https",
        hostname: "www.awesomecuisine.com",
      },
      {
        protocol: "https",
        hostname: "pipingpotcurry.com",
      },
      {
        protocol: "https",
        hostname: "sausagemaker.com",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "millionspizza.co.uk",
      },
      {
        protocol: "https",
        hostname: "vegecravings.com",
      },
      {
        protocol: "https",
        hostname: "www.valdemarsro.dk",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "www.deliciousmeetshealthy.com",
      },
      {
        protocol: "https",
        hostname: "madhurasrecipe.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
