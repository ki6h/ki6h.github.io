import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com'],
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/webp'],
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  // Configure base path if deploying to a subdirectory
  // basePath: '/portfolio',
  
  // Enable webpack bundle analyzer in analyze mode
  webpack: (config, { isServer, dev }) => {
    // Add bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    
    // Optimize images
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 80,
            },
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    });
    
    return config;
  },
  
  // Environment variables that will be available at build time
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://ki6h.github.io',
  },
};

// Add bundle analyzer
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  export default withBundleAnalyzer(nextConfig);
} else {
  export default nextConfig;
}

