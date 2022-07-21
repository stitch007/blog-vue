import type MarkdownIt from 'markdown-it'
import type { App, Plugin } from 'vue'

export * from './starry'

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 * https://example.com/foo?x=1&y=2 -> {x: 1, y: 2}
 */
export const getParamsFromUrl = (url: string) => {
  const params: Record<string, string> = {}
  const suffix = url.split('?')[1]
  suffix && suffix.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    params[key] = value
  })
  return params
}

export const markdownItImageStyle = (md: MarkdownIt) => {
  md.renderer.rules.image = (tokens, idx) => {
    const params = getParamsFromUrl(tokens[idx].attrGet('src') ?? '')
    const attrs = tokens[idx].attrs?.map(attr => `${attr[0]}="${attr[1]}"`).join(' ')
    const style = Object.keys(params).map(key => `${key}:${params[key]}`).join(';')
    return `<img ${attrs} style="${style}" />`
  }
}
