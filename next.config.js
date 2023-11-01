/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
      serverActions: true
    }, 
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
            {
                protocol: 'http',
                hostname: 'books.google.com',
            },
            {
                protocol: 'https',
                hostname: 'books.google.com',
            },
        ],
    },
    typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig