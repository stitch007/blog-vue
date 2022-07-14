import { computed, onMounted, ref } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import markdownItPrism from 'markdown-it-prism'
import type { ComputedRef } from 'vue'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-latex'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-matlab'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-yaml'

// markdown 解析器
const md = MarkdownIt()
  .use(markdownItAnchor)
  .use(markdownItLinkAttributes, {
    matcher: (link: string) => /^https?:\/\//.test(link),
    attrs: {
      target: '_blank',
    },
  })
  .use(markdownItPrism)

/**
 * 解析 markdown
 * @param markdown 原始文本
 * @returns
 */
export const useMarkdown = (markdown: ComputedRef<string | undefined>) => {
  interface IHeadNodes {
    node: Element
    children?: IHeadNodes[]
  }

  const contentEl = ref<HTMLElement | null>(null)
  const headNodes = ref<IHeadNodes[]>([])
  const activeTocName = ref('')
  // 进度 0-100
  const progress = ref(0)

  // markdown -> html
  const content = computed(() => {
    return markdown.value ? md.render(markdown.value) : ''
  })

  // 目录
  const toc = computed(() => {
    return headNodes.value.map(h => ({
      name: h.node.innerHTML,
      active: activeTocName.value === h.node.innerHTML,
      // activeTocName 更新后会触发 toc 更新，从元素中重新获取 offsetTop
      offsetTop: (h.node as HTMLElement).offsetTop,
      children: h.children?.map(child => ({
        name: child.node.innerHTML,
        active: activeTocName.value === h.node.innerHTML,
        offsetTop: (h.node as HTMLElement).offsetTop,
      })),
    }))
  })

  const updateToc = () => {
    toc?.value.forEach((item, i) => {
      // 更新 activeTocName
      if ((headNodes.value[i].node as HTMLElement).offsetTop - window.scrollY <= 50 || activeTocName.value === '') {
        activeTocName.value = item.name
      }
      item.children?.forEach((child, j) => {
        const node = headNodes.value[i].children?.[j].node
        if ((node as HTMLElement).offsetTop - window.scrollY <= 50) {
          activeTocName.value = child.name
        }
      })
    })
  }

  onMounted(() => {
    if (contentEl.value) {
      Array.from(contentEl.value.children).forEach((node) => {
        if (node.nodeName === 'H2') {
          headNodes.value.push({ node })
        } else if (node.nodeName === 'H3') {
          headNodes.value[headNodes.value.length - 1].children?.push({ node })
        }
      })
      // 图片加载完成后 offsetTop 会变，需要更新目录
      contentEl.value.querySelectorAll('img').forEach(img => img.onload = () => updateToc())
    }

    useEventListener('scroll', useThrottleFn(() => {
      // 滚动更新目录
      updateToc()
      // 以下为计算 progress
      const offsetTop = contentEl.value?.offsetTop || 0
      const height = contentEl.value?.clientHeight || 0
      const scrollY = window.scrollY
      if (scrollY < offsetTop) {
        progress.value = 0
      } else if (scrollY > offsetTop + height) {
        progress.value = 100
      } else {
        progress.value = Math.floor(scrollY * 100 / (offsetTop + height))
      }
    }, 100))
  })

  return {
    contentEl,
    content,
    toc,
    progress,
  }
}
