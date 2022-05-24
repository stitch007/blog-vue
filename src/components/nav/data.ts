import { RouterLink } from 'vue-router'
import Shrink from '@/components/wrapper/Shrink.vue'

export interface NavMenu {
  icon: string
  text: string
  path?: string
  children?: NavMenu[]
}

export const menus: NavMenu[] = [
  {
    icon: 'i-mdi:archive',
    text: '文库',
    children: [
      {
        icon: 'i-mdi:book-open',
        text: '文章',
        path: '/articles',
      },
      {
        icon: 'i-mdi:tag',
        text: '标签',
        path: '/tags',
      },
      {
        icon: 'i-mdi:file',
        text: '分类',
        path: '/categories',
      },
    ],
  },
  {
    icon: 'i-mdi:ghost',
    text: '实验室',
    children: [],
  },
  {
    icon: 'i-mdi:github-face',
    text: '分享',
    children: [
      {
        icon: 'i-mdi:camera',
        text: '相册',
        path: '/photos',
      },
      {
        icon: 'i-mdi:music',
        text: '歌单',
        path: '/music',
      },
      {
        icon: 'i-mdi:jellyfish',
        text: '友链',
        path: '/friends',
      },
    ],
  },
  {
    icon: 'i-mdi:information',
    text: '我的',
    children: [
      {
        icon: 'i-mdi:pen',
        text: '留言',
        path: '/message',
      },
      {
        icon: 'i-mdi:star',
        text: '本站',
        path: '/about',
      },
      {
        icon: 'i-mdi:heart',
        text: '打赏',
        path: '/love',
      },
    ],
  },
]

export const dropdownOptions = menus.map((menu) => {
  return menu.children?.map((child, index) => {
    return {
      key: index,
      type: 'render',
      render: () => h(
        RouterLink, {
          class: 'inline-block px-1.5 py-0.5 text-gray-600 dark:text-gray-200',
          to: child.path!,
        }, h(Shrink, {
          class: 'flex items-center px-3 py-1 hover:text-white',
        }, [
          h('div', { class: child.icon }),
          h('div', { class: 'pl-1 text-base font-medium' }, child.text),
        ]),
      ),
    }
  })
})

export const menuOptions = menus.map((menu) => {
  return {
    label: () => h('div', { class: 'inline-block text-base' }, menu.text),
    icon: () => h('div', { class: `${menu.icon} text-base` }),
    key: menu.text,
    children: menu.children?.map((child) => {
      return {
        label: () => h(
          RouterLink, {
            class: 'inline-block text-base',
            to: child.path!,
          },
          child.text,
        ),
        icon: () => h('div', { class: `${child.icon} text-base` }),
        key: child.text,
      }
    }),
  }
})
