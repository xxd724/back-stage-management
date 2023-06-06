import request from '@/utils/request'

// 获取评论
export function getComments(page = 1, limit = 10, blogid = -1, keyword = '') {
  return request({
    url: '/api/comment',
    methods: 'get',
    params: {
      page,
      limit,
      blogid,
      keyword
    }
  })
}
// 删除评论
export function delOneComment(id) {
  return request.delete(`/api/comment/${id}`)
}
