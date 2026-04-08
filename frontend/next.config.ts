import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: "",
  trailingSlash: true,
};

export default nextConfig;
