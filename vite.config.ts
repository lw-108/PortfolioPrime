import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three') || id.includes('postprocessing')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion') || id.includes('motion') || id.includes('gsap')) {
              return 'vendor-animation';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
