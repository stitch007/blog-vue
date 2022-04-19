export const useHorizontalScroll = () => {
  const el = ref<HTMLElement>()
  onMounted(() => {
    useEventListener(el, 'mousewheel', (e) => {
      e.preventDefault()
      el.value!.scrollLeft += (e as WheelEvent).deltaY / 2
    })
  })
  return {
    el,
  }
}
