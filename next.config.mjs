/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['v2.exercisedb.io'],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_EXERCISEDB_API_KEY: process.env.NEXT_PUBLIC_EXERCISEDB_API_KEY,
    NEXT_PUBLIC_EXERCISEDB_HOST: process.env.NEXT_PUBLIC_EXERCISEDB_HOST,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
