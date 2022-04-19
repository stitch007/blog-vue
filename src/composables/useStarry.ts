import type { Ref } from 'vue'
import { starry } from '@/utils'

export const useStarry = (stop: Ref<boolean>) => {
  const el = ref<HTMLCanvasElement>()
  onMounted(() => {
    // 暗黑模式下背景上会动的星星
    if (el.value) {
      starry(el.value, () => !stop.value)
    }
  })
  return {
    el,
  }
}
