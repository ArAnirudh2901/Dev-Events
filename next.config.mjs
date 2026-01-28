/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com'
      },
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },

  reactCompiler: true,
};

export default nextConfig;
