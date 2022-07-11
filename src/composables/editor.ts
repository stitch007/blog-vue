import { onBeforeUnmount, onMounted, ref } from 'vue'
import Vditor from 'vditor'

/**
 * markdown 编辑器
 */
export const useEditor = (isDark: boolean) => {
  const editorEl = ref<HTMLElement>()
  let instance: Vditor | null = null

  onMounted(() => {
    if (editorEl.value) {
      instance = new Vditor(editorEl.value, {
        cache: {
          enable: false,
        },
        counter: {
          enable: true,
        },
        minHeight: 200,
        theme: isDark ? 'dark' : 'classic',
        preview: {
          theme: {
            current: isDark ? 'dark' : 'light',
          },
        },
        toolbar: ['bold', 'italic', 'strike', 'link', 'check', 'quote', 'code', 'inline-code', 'table'],
      })
    }
  })

  onBeforeUnmount(() => {
    instance && instance.destroy()
  })

  const getMarkdown = () => {
    return instance?.getValue() ?? ''
  }

  const switchTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      instance?.setTheme('dark', 'dark')
    } else {
      instance?.setTheme('classic', 'light')
    }
  }

  return {
    editorEl,
    getMarkdown,
    switchTheme,
  }
}
