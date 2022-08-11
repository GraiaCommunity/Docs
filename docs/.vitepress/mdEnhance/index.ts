import MarkdownIt from 'markdown-it'

import { containerPlugin } from './cunstomContainrt'
import { mermaidPlugin } from './mermaid'
import { tasklistPlugin } from './tasklist'

export default (md: MarkdownIt) => {
  md.use(containerPlugin).use(mermaidPlugin).use(tasklistPlugin)
}
