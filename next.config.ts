import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || 'https://rankedin.netlify.app',
  },
}

export default nextConfig
