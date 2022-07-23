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
      id: 0,
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
      const theme: GlobalThemeOverrides = {
        common: {
          primaryColor: this.theme.primaryColor,
          primaryColorHover: this.theme.primaryColor,
          primaryColorPressed: this.theme.primaryColor,
          primaryColorSuppl: this.theme.primaryColor,
        },
        Dropdown: {
          borderRadius: '8px',
        },
      }
      return theme
    },
  },
  actions: {
    // 删除用户(删掉token, 清空state.user)
    clearUser() {
      localStorage.removeItem('token')
      this.$patch((state) => {
        state.user = {
          id: 0,
          username: '',
          avatarUrl: '',
          token: '',
          role: 'USER',
        }
      })
    },
    // token -> localStorage, user ->state.user
    setUser(user: User) {
      localStorage.setItem('token', user.token)
      this.$patch((state) => {
        state.user = user
      })
    },
    // 获取用户信息然后setUser
    fetchUserInfo() {
      return getUserInfo().then((user) => {
        user && this.setUser(user)
      })
    },
    // 切换主题
    toggleDark() {
      this.isDark = !this.isDark
    },
  },
})
