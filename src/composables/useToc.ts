export const useToc = () => {
  const contentEl = ref<HTMLElement>()
  const tocEl = ref<HTMLElement>()
  const tocPercentage = ref(0)

  const links: ChildNode[] = []
  const offsetTops: number[] = []

  onMounted(() => {
    if (contentEl.value) {
      const h = ['H1', 'H2', 'H3']
      contentEl.value.childNodes.forEach((child) => {
        if (h.includes(child.nodeName)) {
          offsetTops.push((child as HTMLElement).offsetTop)
        }
      })
    }
    if (tocEl.value) {
      const queue = [tocEl.value.childNodes]
      while (queue.length) {
        const children = queue.shift()
        children?.forEach((child) => {
          if (child.nodeName === 'A') {
            links.push(child)
            const index = links.length - 1
            useEventListener(child, 'click', (e) => {
              e.preventDefault()
              const target = window.scrollY > offsetTops[index]
                ? offsetTops[index] - 64
                : offsetTops[index] - 6
              window.scrollTo({
                top: target,
                behavior: 'smooth',
              })
            })
          } else {
            queue.push(child.childNodes)
          }
        })
      }
    }
  })

  useEventListener('scroll', useThrottleFn (() => {
    offsetTops.forEach((item, index) => {
      if (item - window.scrollY <= 66) {
        links.forEach((link) => {
          (link as HTMLAnchorElement).className = ''
        })
        const el = links[index] as HTMLAnchorElement
        el.className = 'active'
        history.replaceState(null, '', el.hash)
      }
    })
    const delta = window.scrollY - (contentEl.value?.offsetTop ?? 0)
    const per = delta < 0 ? 0 : delta / (contentEl.value?.offsetHeight ?? 0)
    tocPercentage.value = Math.floor(per > 1 ? 100 : per * 100)
  }, 250))

  return {
    contentEl,
    tocEl,
    tocPercentage,
  }
}
