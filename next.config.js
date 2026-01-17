/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  trailingSlash: true,
  // Skip dynamic routes that can't be statically generated
  generateBuildId: async () => {
    return 'static-build';
  },
};

module.exports = nextConfig;
