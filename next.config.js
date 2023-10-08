const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: "standalone",
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "www.amazon.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};
//module.exports = nextConfig;
