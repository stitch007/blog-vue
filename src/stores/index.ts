import type { App } from 'vue'
import { createPinia } from 'pinia'

/**
 * 初始化 pinia
 */
export const setupPinia = (app: App) => {
  const pinia = createPinia()
  app.use(pinia)
}

export * from './app'
export * from './library'
