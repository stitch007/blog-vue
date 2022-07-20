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
