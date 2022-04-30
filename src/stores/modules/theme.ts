import { defineStore } from 'pinia'
import type { GlobalThemeOverrides } from 'naive-ui'
import { paramCase } from 'change-case'

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

export const useThemeStore = defineStore('theme-store', {
  state: () => ({
    common: {
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
    isDark: useDark({ valueDark: 'dark', valueLight: 'light' }),
  }),
  getters: {
    naiveThemeOverrides(): GlobalThemeOverrides {
      addCssVarsToHtml(this.common, this.isDark)
      const theme: GlobalThemeOverrides = {
        LoadingBar: {
          colorLoading: this.common.primaryColor,
        },
        Dropdown: {
          borderRadius: '8px',
        },
        Menu: {
          itemColorHover: 'transparent',
          itemColorActive: 'transparent',
          itemColorActiveHover: 'transparent',
          itemTextColorHover: this.common.primaryColor,
          itemTextColorActive: this.common.primaryColor,
          itemTextColorActiveHover: this.common.primaryColor,
          itemTextColorChildActive: this.common.primaryColor,
          itemIconColorHover: this.common.primaryColor,
          itemIconColorActive: this.common.primaryColor,
          itemIconColorActiveHover: this.common.primaryColor,
          itemIconColorChildActive: this.common.primaryColor,
          arrowColorHover: this.common.primaryColor,
          arrowColorActive: this.common.primaryColor,
          arrowColorActiveHover: this.common.primaryColor,
          arrowColorChildActive: this.common.primaryColor,
        },
        Input: {
          caretColor: this.common.primaryColor,
          borderHover: `1px solid ${this.common.primaryColor}`,
          borderFocus: `1px solid ${this.common.primaryColor}`,
          boxShadowFocus: `0 0 0 2px ${this.common.primaryColor}33`,
          colorFocus: 'transparent',
          loadingColor: this.common.primaryColor,
        },
      }
      return theme
    },
  },
  actions: {
    toggleDark() {
      this.isDark = !this.isDark
    },
  },
})
