import { defineConfig } from 'vitepress'

import { before, guide, appendix } from './sidebar'

import mdEnhance from './mdEnhance/index'

export default defineConfig({
  lang: 'zh-CN',

  title: 'GraiaX 文档',
  description: 'Documentation by community of Graia Project.',

  lastUpdated: true,

  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/mermaid/9.1.7/mermaid.min.js' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    nav: nav(),
    sidebar: {
      '/before/': before,
      '/guide/': guide,
      '/appendix/': appendix,
    },
    editLink: {
      pattern: 'https://github.com/GraiaCommunity/Docs/edit/vitepress/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/GraiaCommunity/Docs' }],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2022 Graia Community',
    },
    algolia: {
      appId: 'VA229YZAO1',
      apiKey: '91fa3eb8adfd68b9adda9a7495c45944',
      indexName: 'graiax',
    },
  },

  markdown: {
    theme: 'one-dark-pro',
    lineNumbers: true,
    config: mdEnhance,
  },
})

function nav() {
  return [
    { text: '开始之前', link: '/before/', activeMatch: '/before/' },
    { text: '正式上手', link: '/guide/create_env', activeMatch: '/guide/' },
    { text: '附录', link: '/appendix/terms', activeMatch: '/appendix/' },
    { text: 'Graia 官方文档', link: 'https://graia.readthedocs.io/' },
  ]
}
