import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAppStore } from '@/stores'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    return { top: 0 }
  },
})

const adminRouter = ['editor']

const setupNavigationGuards = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const app = useAppStore()
    app.showSettingPage = false
    app.showSideNavbar = false

    const path = to.path.split('/')[1]
    if (!adminRouter.includes(path)) {
      if (to.path !== from.path) {
        window.$loadingBar?.start()
      }
      next()
    } else {
      if (!app.user) {
        window.$message?.error('请先登录')
      } else {
        if (app.user.role !== 'ADMIN') {
          window.$message?.error('没有权限访问本页面')
        }
      }
      next(from.path)
    }
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
