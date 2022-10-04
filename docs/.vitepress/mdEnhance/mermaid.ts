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

import hashSum from 'hash-sum'
import type { PluginSimple } from 'markdown-it'
import MarkdownIt from 'markdown-it'
import { RenderRule } from 'markdown-it/lib/renderer'

export const mermaidPlugin: PluginSimple = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { content, info } = tokens[index]

    switch (info.trim()) {
      case 'mermaid':
        return mermaidRender(...args)
      case 'sequence':
        return mermaidHackRender('sequenceDiagram', content, index)
      case 'class':
        return mermaidHackRender('classDiagram', content, index)
      case 'state':
        return mermaidHackRender('stateDiagram-v2', content, index)
      case 'er':
        return mermaidHackRender('erDiagram', content, index)
      case 'journey':
        return mermaidHackRender('journey', content, index)
      case 'gantt':
        return mermaidHackRender('gantt', content, index)
      case 'pie':
        return mermaidHackRender('pie', content, index)
      case 'git-graph':
        return mermaidHackRender('gitGraph', content, index)
      case 'c4c':
        return mermaidHackRender('C4Context', content, index)
    }
    return fence!(...args) // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }

  md.renderer.rules['mermaid'] = mermaidRender
}

const hash: (val: unknown) => string = hashSum

const mermaidRender: RenderRule = (tokens, index) => {
  const token = tokens[index]
  const key = `mermaid-${hash(index)}`
  const { content } = token

  return `<Mermaid id="${key}" code="${encodeURIComponent(content)}"></Mermaid>`
}

const mermaidHackRender = (name: string, content: string, index: number): string =>
  `<Mermaid id="mermaid-${hash(index)}" code="${encodeURIComponent(
    `${name}\n${content
      .split('\n')
      .map((line) => (line ? `  ${line}` : ''))
      .join('\n')}`
  )}"></Mermaid>`
