import request from '@/utils/request'

// 获取评论
export function getMessages(page = 1, limit = 10, blogid = -1, keyword = '') {
  return request({
    url: '/api/message',
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
export function delOneMessage(id) {
  return request.delete(`/api/message/${id}`)
}
