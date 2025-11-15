const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13+
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle canvas for server-side rendering
      config.externals = config.externals || []
      config.externals.push({
        canvas: 'canvas',
      })
    } else {
      // For client-side, configure pdfjs-dist to avoid bundling issues
      // This prevents "Object.defineProperty called on non-object" errors
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
      
      // Mark pdfjs-dist as external for client-side
      config.externals = config.externals || []
      if (Array.isArray(config.externals)) {
        config.externals.push({
          'pdfjs-dist': 'pdfjs-dist',
        })
      }
    }
    
    // Bundle analyzer (enable with ANALYZE=true)
    if (process.env.ANALYZE === 'true' && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: './bundle-analysis.html',
        })
      )
    }
    
    return config
  },
}

module.exports = withNextIntl(nextConfig)
