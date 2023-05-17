// vite.config.js
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite';
import unocssConfig from './uno.config.js';

import { resolve } from 'path'

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        // 'index': resolve(__dirname, 'index.html'),
        'test': resolve(__dirname, 'page/test/index.html'),
      },
    },
  },
  plugins: [
    UnoCSS(unocssConfig),
  ]
})
