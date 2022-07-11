import { defineStore } from 'pinia'
import { StorageSerializers, useDark, useLocalStorage } from '@vueuse/core'
import { paramCase } from 'change-case'
import type { GlobalThemeOverrides } from 'naive-ui'
import type { Auth } from '@/service'

export type User = Auth & Record<'username', string>

/**
 * 添加 css 变量到 html 中
 */
export const addCssVarsToHtml = (vars: Record<string, string | Record<'light'|'dark', string>>, isDark: boolean) => {
  const keys = Object.keys(vars)
  const styles: string[] = []
  keys.forEach((key) => {
    let value = vars[key]
    if (typeof value !== 'string') {
      value = isDark ? value.dark : value.light
    }
    styles.push(`--${paramCase(key)}: ${value}`)
  })
  document.documentElement.style.cssText += styles.join(';')
}

export const useAppStore = defineStore('app-store', {
  state: () => ({
    // 移动端 显示侧边栏
    showSidebar: false,
    // 显示设置面板
    showSettingPage: false,
    // 用户信息
    user: useLocalStorage<User | null>('user', null, { serializer: StorageSerializers.object }),
    // 主题，会被以css变量的形式添加到html中
    theme: {
      primaryColor: '#425aef',
      darkBgColor: '#1d1b26',
      scrollbarTrackColor: {
        light: '#eeeeee',
        dark: '#1d1b26',
      },
      scrollbarThumbColor: {
        light: '#acadb3',
        dark: '#595864',
      },
    },
    // 暗黑模式
    isDark: useDark({ valueDark: 'dark', valueLight: 'light' }),
  }),
  getters: {
    // 是否登录
    isLogin(): boolean {
      return !!(this.user && this.user.token)
    },
    naiveThemeOverrides(): GlobalThemeOverrides {
      addCssVarsToHtml(this.theme, this.isDark)
      const primaryColor = this.theme.primaryColor
      const theme: GlobalThemeOverrides = {
        LoadingBar: {
          colorLoading: primaryColor,
        },
        Dropdown: {
          borderRadius: '8px',
        },
        Menu: {
          itemColorHover: 'transparent',
          itemColorActive: 'transparent',
          itemColorActiveHover: 'transparent',
          itemTextColorHover: primaryColor,
          itemTextColorActive: primaryColor,
          itemTextColorActiveHover: primaryColor,
          itemTextColorChildActive: primaryColor,
          itemIconColorHover: primaryColor,
          itemIconColorActive: primaryColor,
          itemIconColorActiveHover: primaryColor,
          itemIconColorChildActive: primaryColor,
          arrowColorHover: primaryColor,
          arrowColorActive: primaryColor,
          arrowColorActiveHover: primaryColor,
          arrowColorChildActive: primaryColor,
        },
        Input: {
          caretColor: primaryColor,
          borderHover: `1px solid ${primaryColor}`,
          borderFocus: `1px solid ${primaryColor}`,
          boxShadowFocus: `0 0 0 2px ${primaryColor}33`,
          colorFocus: 'transparent',
          loadingColor: primaryColor,
        },
      }
      return theme
    },
  },
  actions: {
    // 删除用户
    clearUser() {
      this.user = null
    },
    // 切换主题
    toggleDark() {
      this.isDark = !this.isDark
    },
  },
})
