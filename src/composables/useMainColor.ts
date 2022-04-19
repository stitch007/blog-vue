import { prominent } from 'color.js'

export const useMainColor = (img: string | HTMLImageElement) => {
  const color = ref('')

  // prominent(img, { amount: 1, format: 'hex' }).then((res) => {
  //   color.value = res.toString()
  // })

  return {
    color,
  }
}
