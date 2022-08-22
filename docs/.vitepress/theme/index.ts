import DefaultTheme from 'vitepress/theme'
import { Theme } from 'vitepress'

import '../styles/index.scss'

/* eslint-disable */
// @ts-ignore
import Layout from './Layout.vue'

// @ts-ignore
import { CodeGroup } from '../mdEnhance/components/CodeGroup' // @ts-ignore
import CodeGroupItem from '../mdEnhance/components/CodeGroupItem.vue' // @ts-ignore
import Mermaid from '../mdEnhance/components/Mermaid' // @ts-ignore

import ChatFile from '../components/FakeQQ/ChatFile.vue' // @ts-ignore
import ChatImg from '../components/FakeQQ/ChatImg.vue' // @ts-ignore
import ChatMsg from '../components/FakeQQ/ChatMsg.vue' // @ts-ignore
import ChatQuote from '../components/FakeQQ/ChatQuote.vue' // @ts-ignore
import ChatToast from '../components/FakeQQ/ChatToast.vue' // @ts-ignore
import ChatVoice from '../components/FakeQQ/ChatVoice.vue' // @ts-ignore
import ChatWindow from '../components/FakeQQ/ChatWindow.vue' // @ts-ignore
import ForwardChat from '../components/FakeQQ/ForwardChat.vue'
// @ts-ignore
import Curtain from '../components/Curtain.vue' // @ts-ignore
import GitRepo from '../components/GitRepo.vue' // @ts-ignore
import Loading from '../components/Loading.vue' // @ts-ignore
import MoreInfo from '../components/MoreInfo.vue' // @ts-ignore
import RubyCurtain from '../components/RubyCurtain.vue' // @ts-ignore
import VolumeBar from '../components/VolumeBar.vue' // @ts-ignore
/* eslint-enable */

const theme: Theme = {
  // ...DefaultTheme,
  // root component to wrap each page
  Layout,

  // this is a Vue 3 functional component
  NotFound: DefaultTheme.NotFound,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
    app.component('ChatFile', ChatFile)
    app.component('ChatImg', ChatImg)
    app.component('ChatMsg', ChatMsg)
    app.component('ChatQuote', ChatQuote)
    app.component('ChatToast', ChatToast)
    app.component('ChatVoice', ChatVoice)
    app.component('ChatWindow', ChatWindow)
    app.component('ForwardChat', ForwardChat)

    app.component('Curtain', Curtain)
    app.component('GitRepo', GitRepo)
    app.component('Loading', Loading)
    app.component('MoreInfo', MoreInfo)
    app.component('RubyCurtain', RubyCurtain)
    app.component('VolumeBar', VolumeBar)

    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)
    app.component('Mermaid', Mermaid)
  },
}

export default theme
