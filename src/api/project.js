import request from '@/utils/request'

// 添加项目
export function addProject(data) {
  return request.post('/api/project', data)
}

// 获取项目
export function getProjects() {
  return request.get('/api/project')
}
// 修改某一个项目
export function updateProject(id, info) {
  return request({
    url: `/api/project/${id}`,
    method: 'put',
    data: info
  })
}
// 删除某一个项目
export function delOneProject(id) {
  return request.delete(`/api/project/${id}`)
}
