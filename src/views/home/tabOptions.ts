import HomeCard from './HomeCard.vue'
import { useLibraryStore } from '@/stores'
import type { Article } from '@/service'

const getRender = (articles: Article[]) => {
  return () => h('div', { class: 'mt4' }, articles.map(article => h(HomeCard, { article })))
}

export const getTabOptions = () => {
  const lib = useLibraryStore()
  const options = computed(() => {
    return [{
      name: '首页',
      render: getRender(lib.articles),
    }].concat(lib.sameCategoryArticles.map((item) => {
      return {
        name: item.category.name,
        render: getRender(item.articles),
      }
    }))
  })
  return { options }
}
