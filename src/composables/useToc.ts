export const useToc = () => {
  const contentEl = ref<HTMLElement>()
  const tocEl = ref<HTMLElement>()
  const contentTitles = ref<ChildNode[]>([])
  const tocLinks = ref<ChildNode[]>([])

  onMounted(() => {
    if (contentEl.value) {
      const h = ['H1', 'H2', 'H3']
      contentEl.value.childNodes.forEach((child) => {
        if (h.includes(child.nodeName)) {
          contentTitles.value.push(child)
        }
      })
    }
    if (tocEl.value) {
      const queue = [tocEl.value.childNodes]
      while (queue.length) {
        const children = queue.shift()
        children?.forEach((child) => {
          if (child.nodeName === 'A') {
            tocLinks.value.push(child)
          } else {
            queue.push(child.childNodes)
          }
        })
      }
    }
  })

  return {
    contentEl,
    tocEl,
    contentTitles,
    tocLinks,
  }
}
