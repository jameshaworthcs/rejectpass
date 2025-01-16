import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3105,
    proxy: {
      '/api': {
        target: 'http://localhost:3105',
        changeOrigin: true,
        secure: false
      }
    },
    cors: true
  },
})
