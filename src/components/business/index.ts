import blogTitle from './BlogTitle.vue'
import link from './Link.vue'
import search from './Search.vue'
import sidebar from './Sidebar.vue'

import { withInstall } from '@/utils'

export * from './articles'
export * from './home'

export const BlogTitle = withInstall(blogTitle)
export const Link = withInstall(link)
export const Search = withInstall(search)
export const Sidebar = withInstall(sidebar)
