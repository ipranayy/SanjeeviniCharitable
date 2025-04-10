import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env': {}
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    hmr: {
      overlay: true,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});