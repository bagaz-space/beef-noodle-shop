import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: C:\Users\USER isn't a git repo, so Next/Turbopack
  // would otherwise warn about the package-lock.json it finds up the tree.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
