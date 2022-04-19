import type { App } from 'vue'
import { createPinia } from 'pinia'

export const setupPinia = (app: App) => {
  const pinia = createPinia()
  pinia.use(({ store }) => {
    store.init && store.init()
  })
  app.use(pinia)
}

export * from './modules/app'
export * from './modules/library'
export * from './modules/theme'
