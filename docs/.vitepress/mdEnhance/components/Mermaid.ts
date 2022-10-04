/* 修改自 vuepress-plugin-md-enhance
 * @src https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance/src/node/markdown-it/mermaid.ts
 * @last-updated 2022-8-13
 */

/* The MIT License (MIT)
 *
 * Copyright (c) 2018, PRESENT by MrHope
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author MrHope
 * @website https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance
 *
 */

import { defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { LoadingIcon } from './Icons'

import type { VNode } from 'vue'

import mermaid from 'mermaid'

const getThemeVariables = (isDarkMode: boolean): Record<string, unknown> => {
  return {
    dark: isDarkMode,
    background: isDarkMode ? '#1e1e1e' : '#fff',

    primaryColor: isDarkMode ? '#389d70' : '#4abf8a',
    primaryBorderColor: isDarkMode ? '#389d70' : '#4abf8a',
    primaryTextColor: '#fff',

    secondaryColor: '#ffb500',
    secondaryBorderColor: isDarkMode ? '#fff' : '#000',
    secondaryTextColor: isDarkMode ? '#ddd' : '#333',

    tertiaryColor: isDarkMode ? '#282828' : '#efeef4',
    tertiaryBorderColor: isDarkMode ? '#bbb' : '#242424',
    tertiaryTextColor: isDarkMode ? '#ddd' : '#333',

    // note
    noteBkgColor: isDarkMode ? '#f6d365' : '#fff5ad',
    noteTextColor: '#242424',
    noteBorderColor: isDarkMode ? '#f6d365' : '#333',

    lineColor: isDarkMode ? '#d3d3d3' : '#333',
    textColor: isDarkMode ? '#fff' : '#242424',

    mainBkg: isDarkMode ? '#389d70' : '#4abf8a',
    errorBkgColor: '#eb4d5d',
    errorTextColor: '#fff',

    // flowchart
    nodeBorder: isDarkMode ? '#389d70' : '#4abf8a',
    nodeTextColor: isDarkMode ? '#fff' : '#242424',

    // sequence
    signalTextColor: isDarkMode ? '#9e9e9e' : '#242424',

    // class
    classText: '#fff',

    // state
    labelColor: '#fff',

    // colors
    fillType0: isDarkMode ? '#cf1322' : '#f1636e',
    fillType1: '#f39c12',
    fillType2: '#2ecc71',
    fillType3: '#fa541c',
    fillType4: '#25a55b',
    fillType5: '#13c2c2',
    fillType6: '#096dd9',
    fillType7: '#aa6fe9',
  }
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mermaid',

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
  },

  setup(props) {
    const svgCode = ref('')
    const mermaidElement = ref<HTMLElement>()
    const isDarkmode = ref(false)
    let observer: MutationObserver

    onMounted(() => {
      const html = document.getElementsByTagName('html')[0]
      const code = decodeURIComponent(props.code)

      const getDarkmodeStatus = (): boolean =>
        html.classList.contains('dark') || html.getAttribute('data-theme') === 'dark'

      // FIXME: Should correct handle dark selector
      isDarkmode.value = getDarkmodeStatus()

      const { initialize, render } = mermaid

      const renderMermaid = (): void => {
        // generate a unvisiable container
        const container = document.createElement('div')

        container.style.position = 'relative'
        container.style.top = '-9999px'

        const renderCallback = (code: string): void => {
          svgCode.value = code
          document.body.removeChild(container)
        }

        initialize({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          theme: 'base',
          themeVariables: getThemeVariables(isDarkmode.value),
          flowchart: { useMaxWidth: false },
          sequence: { useMaxWidth: false },
          journey: { useMaxWidth: false },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          gantt: { useMaxWidth: false },
          er: { useMaxWidth: false },
          pie: { useMaxWidth: false },

          // ...MERMAID_OPTIONS,
          startOnLoad: false,
        })

        // clear SVG Code
        svgCode.value = ''

        document.body.appendChild(container)

        // make sure dom is refreshed
        void nextTick(() => {
          render(props.id, code, renderCallback, container)
        })
      }

      renderMermaid()

      // watch darkmode change
      observer = new MutationObserver(() => {
        isDarkmode.value = getDarkmodeStatus()
      })

      observer.observe(html, {
        attributeFilter: ['class', 'data-theme'],
        attributes: true,
      })

      watch(isDarkmode, renderMermaid)
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
    })

    return (): VNode =>
      h(
        'div',
        {
          ref: mermaidElement,
          class: ['md-enhance-mermaid', { loading: !svgCode.value }],
        },
        svgCode.value
          ? // mermaid
            h('div', { class: 'content', innerHTML: svgCode.value })
          : // loading
            h(LoadingIcon)
      )
  },
})
