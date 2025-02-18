import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    host:"0.0.0.0",
    allowedHosts: ["todo-list-wy2r.onrender.com"],
  },
  base: "/ToDo-List/",
})
