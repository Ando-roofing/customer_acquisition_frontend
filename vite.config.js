import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, 'src/app'),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@core": path.resolve(__dirname, "src/core"),
      "@features": path.resolve(__dirname, "src/features"),
      "@store": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
})
