import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is '/' locally; on GitHub Pages the Actions workflow sets VITE_BASE=/<repo>/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  server: { host: true },
})
