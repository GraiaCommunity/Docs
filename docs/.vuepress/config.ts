import { containerPlugin } from '@vuepress/plugin-container'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import { localTheme } from './theme'

export default defineUserConfig({
  // 文档名
  lang: 'zh-CN',
  title: 'GraiaX 文档',
  description: 'GraiaX 文档',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  theme: localTheme,
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: '来，搜',
        },
      },
    }),
    containerPlugin({
      type: 'interlink',
    }),
    containerPlugin({
      type: 'tsukkomi',
      locales: {
        '/': {
          defaultInfo: '吐槽',
        },
      },
    }),
    shikiPlugin({
      theme: 'one-dark-pro',
    }),
  ],
})
