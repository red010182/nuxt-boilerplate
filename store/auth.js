import User from '@/models/User'
export const state = () => ({
  user: new User(),
  token: null,
  tokenType: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },

  setToken (state, token, tokenType) {
    state.token = token
    state.tokenType = tokenType
    localStorage.setItem('userToken', token)
    localStorage.setItem('tokenType', tokenType)
  },

  reset (state) {
    state.token = null
    state.tokenType = null
    state.user = null
    localStorage.removeItem('userToken')
    localStorage.removeItem('tokenType')
    localStorage.removeItem('user')
  }
}
