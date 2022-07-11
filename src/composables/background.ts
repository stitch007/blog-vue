import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { starry } from '@/utils'

/**
 * 星空背景
 */
export const useStarry = (stop: Ref<boolean>) => {
  const el = ref<HTMLCanvasElement>()
  onMounted(() => {
    if (el.value) {
      starry(el.value, () => !stop.value)
    }
  })
  return {
    el,
  }
}
