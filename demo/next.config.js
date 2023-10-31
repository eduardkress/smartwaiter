/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: "https://demo.smartwaiter.app",
    NEXTAUTH_SECRET: "33jr9jfH5CLwSqsArC2uugxFXFW7vZhF",
    SALT: "EjW8grHa5Ohg7xGVpxVDxq08wSZZxJiw",
  },
};

module.exports = nextConfig;
