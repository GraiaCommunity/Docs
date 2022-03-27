import { path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { navbar, sidebar } from './configs/'

export default defineUserConfig<DefaultThemeOptions>({
  // 文档名
  lang: 'zh-CN',
  title: 'GraiaX文档',
  description: 'GraiaX文档',

  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  theme: path.resolve(__dirname, './theme'),
  themeConfig: {
    logo: '/logo.svg',
    repo: 'GraiaCommunity/Docs',
    editLink: false,

    // medium-zoom 配置项
    selector: '.theme-default-content :not(a) > img:not(.no-zoom)',
    zoomOptions: {
      margin: 16,
    },

    navbar: navbar,
    sidebar: sidebar,

    // custom containers
    tip: '提示',
    warning: '注意',
    danger: '警告',

    notFound: [
      '你在翻什么，这里可没有涩图哦',
      '朋友，你是不是迷路了',
      '不要乱翻，会乱的',
    ],
    backToHome: '返回首页',

    openInNewWindow: '在新窗口打开',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: '来，搜',
          },
        },
      },
    ],
    [
      '@vuepress/plugin-container',
      {
        type: 'interlink',
      },
    ],
    [
      '@vuepress/plugin-container',
      {
        type: 'tsukkomi',
        locales: {
          '/': {
            defaultInfo: '吐槽',
          },
        },
      },
    ],
    [
      '@vuepress/plugin-shiki',
      {
        theme: 'one-dark-pro',
      },
    ],
  ],
})
