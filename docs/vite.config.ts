// 由于 Pnpm 和 VitePress 的关系，不可以手动安装 vite 依赖，否则会报错
// import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import importToCDN from 'vite-plugin-cdn-import'

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
    importToCDN({
      modules: [
        {
          name: 'mermaid',
          var: 'mermaid',
          path: 'https://cdn.bootcdn.net/ajax/libs/mermaid/9.1.5/mermaid.min.js'
        }
      ]
    })
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
}
