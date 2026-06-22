import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow large static files (videos) to be served from /public
  experimental: {},
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Content-Type', value: 'video/mp4' },
          { key: 'Cache-Control', value: 'public, max-age=31536000' },
        ],
      },
    ];
  },
};

export default nextConfig;
