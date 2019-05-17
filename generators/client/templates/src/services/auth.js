const TOKEN_KEY = '@SecretToken:token'
const USER_KEY = '@SecretToken:userid'
const USER_DATA = '@SecretToken:user'

export const isAuthenticated = () => {
  // TODO: improve authentication validation
  return sessionStorage.getItem(TOKEN_KEY) !== null
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY)
}
export const getUserID = () => {
  return sessionStorage.getItem(USER_KEY)
}

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem(USER_DATA))
}

export const login = data => {
  sessionStorage.setItem(TOKEN_KEY, data.token)
  sessionStorage.setItem(USER_KEY, data.user._id)
  sessionStorage.setItem(USER_DATA, JSON.stringify(data.user))
}

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(USER_DATA)
}
