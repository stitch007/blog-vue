import Vditor from 'vditor'

export const useEditor = () => {
  const el = ref<HTMLElement>()
  let instance: Vditor | null = null
  const wordCount = ref(0)

  onMounted(() => {
    nextTick(() => {
      if (el.value) {
        instance = new Vditor(el.value, {
          height: 1000,
          mode: 'wysiwyg',
          cache: {
            enable: false,
          },
          counter: {
            enable: true,
            after: (length) => {
              wordCount.value = length
            },
          },
          placeholder: '请输入内容',
          toolbar: ['headings', 'bold', 'italic', 'strike', 'link', 'list', 'ordered-list', 'check', 'outdent', 'indent',
            'quote', 'line', 'code', 'inline-code', 'insert-before', 'insert-after', 'table', 'undo', 'redo', 'edit-mode',
            'both', 'code-theme', 'content-theme', 'export', 'outline'],
        })
      }
    })
  })

  onBeforeUnmount(() => {
    instance && instance.destroy()
  })

  const getMarkdown = () => {
    return instance?.getValue() ?? ''
  }

  return {
    el,
    wordCount,
    getMarkdown,
  }
}
