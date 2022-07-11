import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
// import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    vueJsx(),
    Pages(),
    Layouts(),
    // AutoImport({
    //   imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
    //   dts: 'src/auto-imports.d.ts',
    // }),
    Unocss(),
  ],
})
