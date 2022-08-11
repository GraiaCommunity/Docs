// FROM: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance/src/node/markdown-it/mermaid.ts
// Last Sync: 2022-8-10 21:38

import hashSum from 'hash-sum'
import type { PluginSimple } from 'markdown-it'
import MarkdownIt from 'markdown-it'
import { RenderRule } from 'markdown-it/lib/renderer'

export const mermaidPlugin: PluginSimple = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence
  console.log('test')
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

const mermaidHackRender = (
  name: string,
  content: string,
  index: number
): string =>
  `<Mermaid id="mermaid-${hash(index)}" code="${encodeURIComponent(
    `${name}\n${content
      .split('\n')
      .map((line) => (line ? `  ${line}` : ''))
      .join('\n')}`
  )}"></Mermaid>`
