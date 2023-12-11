/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_PATH: 'http://localhost:8000'
  }
  // basePath: "/~ncherian/5130f2023/cherian-nisha_project/ui/out"
}

module.exports = nextConfig
