import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  server: {
    port: 5001,         // <-- Set specific port here (5001 for Admin, 5002 for Teacher, etc.)
    strictPort: true,   // <-- Prevents Vite from auto-switching to 5002 if 5001 is busy
  },
  plugins: [
    react(),
    federation({
      name: 'mfe_admin',
      filename: 'remoteEntry.js',
      exposes: {
        './Dashboard': './src/dashboard/index.jsx'
      },
      shared: ['react', 'react-dom', 'shared-ui', 'shared-api', 'shared-core']
    })
  ],
  build: {
    target: 'esnext'
  }
});