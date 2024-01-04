/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  transpilePackages: ['api', 'cms', 'tailwind-config', 'ui', 'utils'],

  // We already do linting on GH actions
  eslint: {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    ignoreDuringBuilds: !!process.env.CI,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
