import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/nimbus/',  // IMPORTANT: must match repo name exactly
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  // GitHub Pages for this repo serves the committed docs/ folder, not dist/.
  build: { outDir: 'docs', emptyOutDir: true }
})
