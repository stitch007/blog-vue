import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import type { ComputedRef } from 'vue'
import { markdownItImageStyle } from '@/utils'

const toc = ref('')

const md = MarkdownIt()
  .use(markdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#',
    level: [1, 2, 3],
  })
  .use(markdownItTocDoneRight, {
    containerClass: 'toc-container',
    level: [1, 2, 3],
    callback: (tocCode) => {
      toc.value = tocCode
    },
  })
  .use(markdownItImageStyle)

export const useMarkdown = (markdown: ComputedRef<string | undefined>) => {
  const content = computed(() => {
    return markdown.value ? md.render(markdown.value) : ''
  })

  return {
    content,
    toc,
  }
}
