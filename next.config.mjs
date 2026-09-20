/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'enqmjrjuwzdbmemktlfp.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;