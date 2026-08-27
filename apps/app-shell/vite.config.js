export default defineConfig({
  server: {
    port: 3001,
    strictPort: true,
  },
  plugins: [
    react(),
    federation({
      name: 'app_shell',
      remotes: {
        // Pointing to the exact ports we just defined
        mfe_admin: 'http://localhost:5001/assets/remoteEntry.js',
        mfe_teacher: 'http://localhost:5002/assets/remoteEntry.js',
        mfe_student: 'http://localhost:5003/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'shared-ui', 'shared-api', 'shared-core']
    })
  ],
  build: { target: 'esnext' }
});