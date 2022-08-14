// 由于 Pnpm 和 VitePress 的关系，不可以手动安装 vite 依赖，否则会报错
// import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import externalGlobals from 'rollup-plugin-external-globals'

// https://cn.vitejs.dev/config/
export default {
  plugins: [
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      plugins: [externalGlobals({ mermaid: 'mermaid' })],
    },
  },
}
