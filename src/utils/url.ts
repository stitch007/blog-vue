export const getParamsFromUrl = (url: string) => {
  const params: Record<string, string> = {}
  url.split('?')[1].split('&').forEach((item) => {
    const [key, value] = item.split('=')
    params[key] = value
  })
  return params
}
