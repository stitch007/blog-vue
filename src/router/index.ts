import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAppStore } from '@/stores'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const handlePagePermission = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  next()
}

const setupNavigationGuards = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
      window.$loadingBar?.start()
    }
    useAppStore().showSideNavbar = false
    handlePagePermission(to, from, next)
  })

  router.afterEach((to, from) => {
    window.$loadingBar?.finish()
    to.meta?.title && useTitle(to.meta.title as string)
  })
}

export const setupRouter = async (app: App) => {
  app.use(router)
  setupNavigationGuards(router)
  await router.isReady()
}
