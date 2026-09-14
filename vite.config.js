import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep heavy, rarely-needed libraries in their own chunks so the
    // initial bundle for a first-time visitor stays small. three.js is
    // only needed when the Globe component mounts, and sweetalert2 only
    // when a modal actually opens — both are already dynamically
    // imported, but we also pin them to dedicated vendor chunks here so
    // they cache independently of app code across deploys.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('sweetalert2')) return 'vendor-swal';
            if (id.includes('react-router-dom') || id.includes('/react/') || id.includes('react-dom')) {
              return 'vendor-react';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 650,
    cssCodeSplit: true,
  },
});
