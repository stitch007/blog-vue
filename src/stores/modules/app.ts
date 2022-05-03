import { defineStore } from 'pinia'
import MobileDetect from 'mobile-detect'
import type { RemovableRef } from '@vueuse/core'
import { StorageSerializers, breakpointsTailwind } from '@vueuse/core'
import type { Auth } from '@/service'

export type User = Auth & Record<'username', string>

export const mobileDetect = new MobileDetect(window.navigator.userAgent)

export const useAppStore = defineStore('app-store', () => {
  const scroll = useScroll(document, { throttle: 100 })
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isPhone = ref(mobileDetect.phone() !== null)
  const smallerThanMd = breakpoints.smaller('md')
  const smallerThanLg = breakpoints.smaller('lg')
  const showNavbar = ref(true)
  const showSideNavbar = ref(false)
  const navbarBgSolid = ref(false)
  const mustBeSolid = ref(false)
  const showSettingPage = ref(false)
  const user: RemovableRef<User> = useLocalStorage('user', null, { serializer: StorageSerializers.object })

  watch(scroll.y, (newVal, oldVal) => {
    navbarBgSolid.value = mustBeSolid.value || newVal > 1
    showNavbar.value = !(!(newVal < oldVal) && newVal > 180)
  })

  const clearUser = () => {
    user.value = null
  }

  return {
    isPhone,
    smallerThanMd,
    smallerThanLg,
    showSideNavbar,
    showNavbar,
    navbarBgSolid,
    mustBeSolid,
    showSettingPage,
    user,
    clearUser,
  }
})
