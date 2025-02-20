import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "ai.golockedin.com", // Allow Vite to bind to this domain
    strictPort: true, // Ensures Vite always uses the specified port
    port: 4173, // You can change this if needed
    cors: true // Allows cross-origin requests if needed
  },
  preview: {
    host: "ai.golockedin.com",
    port: 4173,
  }
})
