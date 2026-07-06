import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: path.resolve(__dirname, 'app'),
  server: {
    port: 3000,
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, '../../node_modules'),
        process.cwd(),
      ],
    },
  },
  resolve: {
    alias: {
      '/pdfs': path.resolve(process.cwd(), 'pdfs'),
      '@teamless/react': path.resolve(__dirname, '../react/src'),
    },
  },
});
