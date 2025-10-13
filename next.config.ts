import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sanity Studio configuration
  transpilePackages: ['@sanity/ui', '@sanity/icons'],
  
  // Webpack configuration for better Sanity compatibility
  webpack(config: any) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sanity/block-content-to-react': false,
      '@sanity/block-content-to-hyperscript': false,
    };
    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
  
  // Headers for proper CORS handling with Sanity
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },

  // Redirect configuration for studio access
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/studio',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
