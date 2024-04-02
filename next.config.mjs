/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  distDir: process.env.NODE_ENV === 'production' ? 'out': undefined
};

export default nextConfig;
