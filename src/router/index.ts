import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAppStore } from '@/stores'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    return { top: 0 }
  },
})

const adminRouter = ['/create']

/**
 * 初始化路由守卫
 */
const setupNavigationGuards = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const app = useAppStore()
    app.showSidebar = false

    // 权限判断
    if (adminRouter.includes(to.path)) {
      if (!app.user.token) {
        window.$message?.error('请先登录')
        next({ path: '/login' })
        return
      } else if (app.user.role !== 'ADMIN') {
        window.$message?.error('没有权限访问本页面')
        next({ path: from.fullPath })
        return
      }
    }

    if (to.path !== from.path) {
      window.$loadingBar?.start()
    }
    next()
  })

  router.afterEach((to, from) => {
    window.$loadingBar?.finish()
  })
}

/**
 * 初始化路由
 */
export const setupRouter = async (app: App) => {
  app.use(router)
  setupNavigationGuards(router)
  await router.isReady()
}

export const navOptions = [
  { path: '/', text: '首页', icon: 'i-ic:round-home' },
  { path: '/articles', text: '文章', icon: 'i-ic:round-article' },
  { path: '/tags', text: '标签', icon: 'i-ic:round-tag' },
  { path: '/categories', text: '分类', icon: 'i-ic:round-category' },
]
