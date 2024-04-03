const ENV = process.env.NODE_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  distDir: ENV === 'production' ? 'out': undefined,
  basePath: ENV === 'production' ?  '/pomodoros': ''
};

export default nextConfig;
