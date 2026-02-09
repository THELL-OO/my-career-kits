import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Add the allowed hosts here
    allowedHosts: ['mycareerkits.com', 'localhost', '.mycareerkits.com'], // Allow both your domain and localhost
  },

  // Other configurations remain the same as needed
  base: '/', // root domain

  build: {
    outDir: 'dist', // Output directory for build
    assetsDir: 'assets', // Folder for assets like images, fonts, etc.
    sourcemap: true, // Enable sourcemaps for debugging production builds
  }
})
