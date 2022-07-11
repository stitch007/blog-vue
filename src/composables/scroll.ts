import type { ComputedRef } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useEventListener, useIntervalFn } from '@vueuse/core'

/**
 * 鼠标滚轮：垂直滚动 -> 水平滚动
 */
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

/**
 * 文字滚动列表
 * @param rowList 原始列表
 * @param delay 滚动时间
 * @param maxLength 超出 maxLength 显示省略号
 */
export const useScrollList = (
  rowList: ComputedRef<string[]>,
  delay: number,
  maxLength?: ComputedRef<number>,
) => {
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
    }, delay)

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
