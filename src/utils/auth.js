import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, duration) {
  if (duration === 7) {
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * duration)
    return Cookies.set(TokenKey, token, { expires })
  } else {
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
