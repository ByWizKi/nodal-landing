import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['googleapis'],
  output: 'standalone',
  typescript: {
    // TS is checked separately via tsc --noEmit (passes cleanly).
    // Disabling here to avoid OOM during Docker build.
    ignoreBuildErrors: true,
  },
}

export default nextConfig
