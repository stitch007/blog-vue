import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import markdownItPrism from 'markdown-it-prism'
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
  .use(markdownItLinkAttributes, {
    matcher: (link: string) => /^https?:\/\//.test(link),
    attrs: {
      target: '_blank',
    },
  })
  .use(markdownItPrism)
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
