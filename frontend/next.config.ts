import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "I4E-ROI-Calculator";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
