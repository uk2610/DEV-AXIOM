import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/comming-soon",
        destination: "/coming-soon",
        permanent: true,
      },
    ];
  },
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"images.unsplash.com"
      }
    ]
  }
};

export default withMDX(config);
