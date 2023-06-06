import request from '@/utils/request'

// 获取所有分类
export function getBlogTypes() {
  return request({
    url: '/api/blogtype',
    method: 'get'
  })
}
// 添加分类
export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}
// 删除分类
export function delBlogType(id) {
  return request.delete(`/api/blogtype/${id}`)
}
// 查找某一文章分类
export function findOneBlogType(id) {
  return request.get(`/api/blogtype/${id}`)
}
// 更新某一个文章分类
export function updateOneBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}
