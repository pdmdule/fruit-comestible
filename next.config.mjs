/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/datenschutz',
        destination: '/agb#datenschutz',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/ueber-uns',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
