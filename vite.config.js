import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PORT is assigned by the preview harness when present.
// GH_PAGES=1 builds for GitHub Pages project hosting under /ember-and-oak/.
export default defineConfig({
  plugins: [react()],
  base: process.env.GH_PAGES ? '/ember-and-oak/' : '/',
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
