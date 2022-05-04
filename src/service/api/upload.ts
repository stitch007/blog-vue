import { http } from '../http'

export const uploadImage = async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)
  const response = await http.request('/upload/image', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  })
  if (response.code !== 200) {
    window.$message?.error(`上传图片失败: ${response.message}`)
    return null
  }
  return response.data as Record<'url', string>
}
