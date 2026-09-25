import type { NextConfig } from 'next';

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
const basePath = configuredBasePath ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}` : '';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    unoptimized: true,
    deviceSizes: [360, 390, 412, 480, 560, 640, 750, 828, 1080, 1200, 1440, 1920],
    qualities: [65, 68, 75],
  },
};
export default config;
