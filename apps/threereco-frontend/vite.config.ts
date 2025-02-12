import react from '@vitejs/plugin-react-swc';

import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@use-it/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
