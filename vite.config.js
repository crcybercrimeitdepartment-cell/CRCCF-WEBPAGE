import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    compression({ algorithm: 'gzip', ext: '.gz' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' })
  ],

  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: process.env.NODE_ENV === 'development' ? true : 'hidden',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide'
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react'
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three') ||
            id.includes('node_modules/react-globe.gl') ||
            id.includes('node_modules/cobe')
          ) {
            return 'vendor-three'
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
