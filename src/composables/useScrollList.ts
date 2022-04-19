import type { ComputedRef } from 'vue'

export const useScrollList = (rowList: ComputedRef<string[]>, maxLength?: ComputedRef<number>) => {
  const currentIndex = ref(0)
  const scrollList = computed(() => {
    return rowList.value.map((text) => {
      if (maxLength?.value) {
        return text.length > maxLength.value ? `${text.substring(0, maxLength.value)}...` : text
      }
      return text
    })
  })

  onMounted(() => {
    const { pause, resume } = useIntervalFn(() => {
      currentIndex.value = currentIndex.value + 1 === scrollList.value.length ? 0 : currentIndex.value + 1
    }, 3000)

    useEventListener(document, 'visibilitychange', () => {
      document.visibilityState === 'hidden' && pause()
      document.visibilityState === 'visible' && resume()
    })
  })

  return {
    currentIndex,
    scrollList,
  }
}
