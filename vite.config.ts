import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
    // This is the important part
    // Redirect all 404s to index.html
    // This is needed for client-side routing to work
    historyApiFallback: {
      rewrites: [
        { from: /^\/.*$/, to: '/index.html' },
      ],
    },
  },
})
