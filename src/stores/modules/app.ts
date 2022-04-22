import { defineStore } from 'pinia'
import MobileDetect from 'mobile-detect'
import { breakpointsTailwind } from '@vueuse/core'

export const mobileDetect = new MobileDetect(window.navigator.userAgent)

export const useAppStore = defineStore('app-store', () => {
  const isPhone = ref(mobileDetect.phone() !== null)
  const smallerThanMd = useBreakpoints(breakpointsTailwind).smaller('md')
  const showNavbar = ref(true)
  const showSideNavbar = ref(false)
  const navbarBgSolid = ref(false)

  const scroll = useScroll(document, { throttle: 100 })

  watch(scroll.y, (newVal, oldVal) => {
    navbarBgSolid.value = newVal > 1
    showNavbar.value = !(!(newVal < oldVal) && newVal > 180)
  })

  return {
    isPhone,
    smallerThanMd,
    showSideNavbar,
    showNavbar,
    navbarBgSolid,
  }
})
