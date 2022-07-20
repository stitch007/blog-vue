import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { paramCase } from 'change-case'
import type { GlobalThemeOverrides } from 'naive-ui'
import type { User } from '@/service'
import { getUserInfo } from '@/service'

/**
 * 添加 css 变量到 html 中
 */
export const addCssVarsToHtml = (vars: Record<string, string | Record<'light' | 'dark', string>>, isDark: boolean) => {
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
    // 用户信息
    user: <User>{
      username: '',
      avatarUrl: '',
      token: localStorage.getItem('token') || '',
      role: 'USER',
    },
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
      return !!this.user.token
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
      localStorage.removeItem('token')
      this.$patch((state) => {
        state.user = {
          username: '',
          avatarUrl: '',
          token: '',
          role: 'USER',
        }
      })
    },
    setUser(user: User) {
      localStorage.setItem('token', user.token)
      this.$patch((state) => {
        state.user = user
      })
    },
    fetchUserInfo() {
      getUserInfo().then((user) => {
        user && this.setUser(user)
      })
    },
    // 切换主题
    toggleDark() {
      this.isDark = !this.isDark
    },
  },
})
