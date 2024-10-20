import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      'three': path.resolve(__dirname, './node_modules/three')
    }
  },
  optimizeDeps: {
    include: ['three']
  },
  build: {
    commonjsOptions: {
      include: [/three/, /node_modules/]
    }
  }
})
