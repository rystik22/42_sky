import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/42_sky', // replace with your GitHub repo name
  trailingSlash: true, // ensures proper routing for static export
};

export default nextConfig;
