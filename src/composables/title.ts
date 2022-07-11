import { useTitle } from '@vueuse/core'

const titleRef = useTitle()

const suffix = ' | Stitch\'s BLOG\''

/**
 * 修改网页标题为 title + suffix
 */
export const changeTitle = (title: string) => {
  titleRef.value = `${title}${suffix}`
}
