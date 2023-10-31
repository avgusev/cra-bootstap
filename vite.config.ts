import dns from 'dns';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // legacy({ modernPolyfills: true }),
    react(),
    svgr(),
    // checker({ typescript: true, eslint: { lintCommand: 'eslint src --ext .js,.jsx,.ts,.tsx' } }),
  ],
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: '$1',
      },
    ],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        signinCallback: resolve(__dirname, 'signinCallback.html'),
        signoutCallback: resolve(__dirname, 'signoutCallback.html'),
        silentRenew: resolve(__dirname, 'silentRenew.html'),
        index: resolve(__dirname, 'index.html'),
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    proxy: {
      '/api-rosreestr': {
        target: `https://pkk.rosreestr.ru`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-rosreestr/, ''),
      },
      '/api-geoserver': {
        target: `http://10.10.10.45:8080/geoserver`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-geoserver/, ''),
      },
      // '/api-pg-graph': {
      //   target: `http://10.10.10.45:3000`,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api-pg-graph/, ''),
      // },
      '/api-pg-graph': {
        target: `http://172.19.22.106:3001`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-pg-graph/, ''),
      },
      '/api-pg': {
        target: `http://10.10.10.45:3000`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-pg/, ''),
      },
      '/api-skdf': {
        target: `https://xn--p1a.xn--d1aluo.xn--p1ai`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-skdf/, ''),
      },
      '/api-image': {
        target: `http://10.0.41.92:6200/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-image/, ''),
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
