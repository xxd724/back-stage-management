import { login, getInfo } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user: null,
    remember: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },
  SET_REMEMBER: (state, payload) => {
    state.remember = payload
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { remember } = userInfo
    if (remember) {
      commit('SET_REMEMBER', remember)
    }
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const { data } = res
        if (data) {
          commit('SET_USER', data)
          resolve()
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (typeof res === 'string') {
          if (JSON.parse(res).code === 401) {
            reject(JSON.parse(res).msg)
          }
        } else {
          commit('SET_USER', res.data)
          resolve()
        }
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

