import type MarkdownIt from 'markdown-it'
import { getParamsFromUrl } from './url'

export const markdownItImageStyle = (md: MarkdownIt) => {
  md.renderer.rules.image = (tokens, idx) => {
    const params = getParamsFromUrl(tokens[idx].attrGet('src') ?? '')
    const attrs = tokens[idx].attrs?.map(attr => `${attr[0]}="${attr[1]}"`).join(' ')
    const style = Object.keys(params).map(key => `${key}:${params[key]}`).join(';')
    return `<img ${attrs} style="${style}" />`
  }
}
