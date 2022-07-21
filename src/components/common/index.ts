import background from './Background.vue'
import backToTop from './BackToTop.vue'
import card from './Card.vue'
import dynamicTags from './DynamicTags.vue'
import naiveProvider from './NaiveProvider.vue'
import shrink from './Shrink.vue'
import tabs from './Tabs.vue'
import toolbar from './Toolbar.vue'

import { withInstall } from '@/utils'

export const Background = withInstall(background)
export const BackToTop = withInstall(backToTop)
export const Card = withInstall(card)
export const DynamicTags = withInstall(dynamicTags)
export const NaiveProvider = withInstall(naiveProvider)
export const Shrink = withInstall(shrink)
export const Tabs = withInstall(tabs)
export const Toolbar = withInstall(toolbar)
