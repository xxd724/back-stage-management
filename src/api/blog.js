import request from '@/utils/request'

// 获取文章
export function getBlogs(page = 1, limit = 10, categoryId = -1, keyword = '') {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit,
      categoryId,
      keyword
    }
  })
}

// 删除文章
export function delOneblog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

// 添加文章
export function addblog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}
// 编辑文章
export function editblog(info) {
  return request({
    url: `/api/blog/${info.id}`,
    method: 'put',
    data: info.data
  })
}
// 根据id查找某一篇文章
export function findOndblog(id) {
  return request.get(`/api/blog/${id}`)
}
