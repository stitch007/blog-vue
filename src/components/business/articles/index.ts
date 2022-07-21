import archives from './Archives.vue'
import articleCard from './ArticleCard.vue'
import articleToc from './ArticleToc.vue'
import libraryCount from './LibraryCount.vue'

import { withInstall } from '@/utils'

export const Archives = withInstall(archives)
export const ArticleCard = withInstall(articleCard)
export const ArticleToc = withInstall(articleToc)
export const LibraryCount = withInstall(libraryCount)
