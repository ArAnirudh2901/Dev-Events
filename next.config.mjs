/** @type {import('next').NextConfig} */
const nextConfig = {

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
