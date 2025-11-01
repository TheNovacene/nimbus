import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/nimbus/',              // 👈 important for GitHub Pages
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
