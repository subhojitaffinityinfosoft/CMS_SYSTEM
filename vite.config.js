import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import VitePluginComlink from 'vite-plugin-comlink'; 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginComlink() // Add the Comlink plugin to handle workers
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: { chunkSizeWarningLimit: 1600},
})
