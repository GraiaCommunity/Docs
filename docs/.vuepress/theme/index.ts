import { defaultTheme } from '@vuepress/theme-default'
import { path } from '@vuepress/utils'
import { navbar, sidebar } from '../configs/'

const theme = defaultTheme({
  logo: '/logo.svg',
  repo: 'GraiaCommunity/Docs',
  editLink: false,

  navbar,
  sidebar,

  // custom containers
  tip: '提示',
  warning: '注意',
  danger: '警告',

  // Translate
  notFound: [
    '你在翻什么，这里可没有涩图哦',
    '朋友，你是不是迷路了',
    '不要乱翻，会乱的',
  ],
  backToHome: '返回首页',
  lastUpdatedText: '最后更新于',
  contributorsText: '贡献者',
  openInNewWindow: '在新窗口打开',
  toggleDarkMode: '切换夜间模式',
  toggleSidebar: '切换侧边栏',

  // TurnOff Default mediumZoom
  themePlugins: { mediumZoom: false },
})

export const localTheme = {
  name: 'vuepress-theme-local',
  extends: theme,
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}
