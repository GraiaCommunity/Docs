import MarkdownIt from 'markdown-it'

import { containerPlugin } from './cunstomContainrt'
import { mermaidPlugin } from './mermaid'
import { tasklistPlugin } from './tasklist-mod'

export default (md: MarkdownIt) => {
  md.use(containerPlugin)
  md.use(mermaidPlugin)
  md.use(tasklistPlugin)
}
