import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin(
  // Specify a custom path here
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置静态资源
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },

  // 确保正确处理静态资源
  // assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
};

export default withNextIntl(nextConfig);