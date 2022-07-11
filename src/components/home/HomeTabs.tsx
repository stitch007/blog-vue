import { computed, defineComponent, ref } from 'vue'
import Tabs from '../common/Tabs.vue'
import HomeArticleCard from './HomeArticleCard.vue'
import { useLibraryStore } from '@/stores'
import type { Article } from '@/service'

const getRender = (articles: Article[]) => {
  return () => (
    <div class="mt2 md:mt4">
      {articles.map(article => <HomeArticleCard class="mt2 md:mt4" key={article.id} article={article} />)}
    </div>
  )
}

export default defineComponent({
  setup() {
    const lib = useLibraryStore()

    const active = ref(0)
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

    return () => (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Tabs v-model={[active.value, 'active']} options={options.value} />
    )
  },
})
