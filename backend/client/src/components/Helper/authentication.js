import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from './localStorage'

export const setAuthentication = (token) => {
  setLocalStorage('token', token)
}

export const isAuthenticated = () => {
  if (getLocalStorage('token')) {
    return getLocalStorage('token')
  } else {
    return false
  }
}

export const logout = () => {
  deleteLocalStorage('token')
  window.location.pathname = '/'
}
