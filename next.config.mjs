/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://image.grandchef.info/img/upload/**")],
  },
};

export default nextConfig;
