import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['three']
    }
  },
  server: {
    port: 3000,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'three': path.resolve(__dirname, 'node_modules/three')
    },
  },
  optimizeDeps: {
    include: [
      'three',
      'three/examples/jsm/loaders/OBJLoader',
      'three/examples/jsm/loaders/FontLoader',
      'three/examples/jsm/geometries/TextGeometry'
    ]
  }
});
