import { http } from '../http'

export const uploadImage = async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)
  const data = await http.request<Record<'url', string>>('/upload/image', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  })
  return data ? data.url : null
}
