import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 恢复登录
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get'
  })
}

// 修改用户信息
export function setUser(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}
