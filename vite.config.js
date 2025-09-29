// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     hmr: {
//       overlay: false, // 🔴 Disable error overlay
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ✅ Use the npm polyfill instead of Node.js built-in module
      events: 'events',
    },
  },
  optimizeDeps: {
    include: ['events'], // ✅ Force Vite to bundle this dependency
  },
  server: {
    hmr: {
      overlay: false, // Disable the red error overlay
    },
  },
});


