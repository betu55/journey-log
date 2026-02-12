import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: { "/api": "http://192.168.0.128:8080" }, // use your LAN IP
  },
});
