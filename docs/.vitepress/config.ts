import { defineConfig } from 'vitepress'

import { before, guide, appendix } from './sidebar'

import mdEnhance from './mdEnhance/index'

export default defineConfig({
  lang: 'zh-CN',

  title: 'GraiaX 文档',
  description: 'Documentation by community of Graia Project.',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/mermaid/9.4.3/mermaid.min.js' }]
  ],

  themeConfig: {
    i18nRouting: true,
    logo: '/logo.svg',
    nav: nav(),
    sidebar: {
      '/before/': before,
      '/guide/': guide,
      '/appendix/': appendix
    },
    editLink: {
      pattern: 'https://github.com/GraiaCommunity/Docs/edit/remake/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/GraiaCommunity/Docs' }],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2022 Graia Community'
    },
    lastUpdatedText: '上次更新',
    algolia: {
      appId: 'VA229YZAO1',
      apiKey: '91fa3eb8adfd68b9adda9a7495c45944',
      indexName: 'graiax'
    },
    outlineTitle: '本页大纲',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '黑暗模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部 ▲'
  },

  transformHead({ assets }) {
    // adjust the regex accordingly to match your font
    const HarmonySansFile = assets.find(() => /HarmonyOSHans\.woff2/)
    if (HarmonySansFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: HarmonySansFile,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      ]
    }
  },

  markdown: {
    theme: 'one-dark-pro',
    lineNumbers: true,
    config: mdEnhance
  }
})

function nav() {
  return [
    { text: '开始之前', link: '/before/', activeMatch: '/before/' },
    { text: '实战演练', link: '/guide/', activeMatch: '/guide/' },
    { text: '附录', link: '/appendix/credit', activeMatch: '/appendix/' },
    { text: 'Graia 官方文档', link: 'https://graia.readthedocs.io/' }
  ]
}
