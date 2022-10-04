/* 修改自 VuePress 2
 * @src https://github.com/vuepress/vuepress-next/tree/main/packages/%40vuepress/plugin-container/src/node
 * @last-updated 2022-8-13
 */

/* The MIT License (MIT)
 *
 * Copyright (c) 2018-present, Yuxi (Evan) You
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
 * @author Yuxi (Evan) You
 * @website https://github.com/vuepress/vuepress-next
 *
 */

import MarkdownIt from 'markdown-it'
import { RenderRule } from 'markdown-it/lib/renderer'
import container from 'markdown-it-container'

export const containerPlugin = (md: MarkdownIt) => {
  md.use(...createContainer('interlink', '相关链接', md))
    .use(...createContainer('tsukkomi', '吐槽', md))
    .use(...createContainer('code-group', 'code-group', md))
    .use(...createContainer('code-group-item', 'code-group-item', md))
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(klass: string, defaultTitle: string, md: MarkdownIt): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()

        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          switch (klass) {
            case 'code-group':
              return `<CodeGroup>\n`
            case 'code-group-item':
              return `<CodeGroupItem title="${info}">\n`
            default:
              return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`
          }
        } else {
          switch (klass) {
            case 'code-group':
              return `</CodeGroup>\n`
            case 'code-group-item':
              return `</CodeGroupItem>\n`
            default:
              return `</div>\n`
          }
        }
      },
    },
  ]
}
