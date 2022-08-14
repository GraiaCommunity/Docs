// 由于 Pnpm 和 VitePress 的关系，import from vite 编辑器可能会标红，但完全工作正常，请不要安装 vite 依赖/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

// https://cn.vitejs.dev/config/
export default defineConfig({
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
})
