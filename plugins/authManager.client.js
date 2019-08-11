import Vue from 'vue'
import api from './api'

const URI = {
  ME: '/member/me',
  LOGIN: '/member/login',
  OAUTH_FB: '/member/oauth_login/fb',
  OAUTH_GOOGLE: '/member/oauth_login/google',
  VERIFY_EMAIL: '/member/verification_email'
}

// const FB_APP_ID = '123'

export default ({ app: { store, router } }) => {
  // window.fbAsyncInit = () => {
  //   FB.init({
  //     appId: FB_APP_ID,
  //     cookie: true,
  //     xfbml: true,
  //     version: 'v3.1'
  //   })
  //   FB.AppEvents.logPageView()
  // }

  const setToken = (token, tokenType = 'Bearer') => {
    api.setHeader({
      Authorization: `${tokenType} ${token}`
    })
    store.auth.commit('setToken', { token, tokenType })
  }

  const fetchUser = () => {
    return new Promise((resolve, reject) => {
      api.get(URI.ME).then(({ data }) => {
        store.auth.commit('setUser', data)
        resolve({ user: data })
      }).catch(reject)
    })
  }

  const afterLoginProcess = (token, tokenType, callback) => {
    setToken(token, tokenType)
    fetchUser().then((user) => {
      callback && callback(null, { token, user })
    })
  }

  const logout = () => {
    store.auth.commit('reset')
    api.setHeader({
      Authorization: ``
    })
  }

  const loadLocalStorage = () => {
    try {
      const token = localStorage.getItem('token')
      const tokenType = localStorage.getItem('tokenType')
      if (token) {
        afterLoginProcess(token, tokenType, null)
      }
    } catch (e) {
      logout()
      console.error(e)
    }
  }

  const login = (account, password) => {
    return new Promise((resolve, reject) => {
      api.post(URI.LOGIN, { account, password }).then(({ data }) => {
        const token = data.access_token
        const tokenType = data.token_type
        afterLoginProcess(token, tokenType, resolve)
      }).catch(reject)
    })
  }

  const fbLogin = () => {
    const options = {
      scope: 'email, public_profile',
      return_scopes: true
    }
    return new Promise((resolve, reject) => {
      window.FB.login(({ status }) => {
        if (status !== 'connected') {
          return reject(status)
        }
        window.FB.api('/me?fields=name,id,email', (fbProfile) => {
          api.post(URI.OAUTH_FB, fbProfile).then(({ data }) => {
            const token = data.access_token
            const tokenType = data.token_type
            afterLoginProcess(token, tokenType, resolve)
          }).catch(reject)
        })
      }, options)
    })
  }

  const onGoogleSignInSuccess = (user) => {
    const googleUser = {
      id: user.w3.Eea,
      name: user.w3.ig,
      email: user.w3.U3
    }
    return new Promise((resolve, reject) => {
      api.post(URI.OAUTH_GOOGLE, googleUser).then(({ data }) => {
        const token = data.access_token
        const tokenType = data.token_type
        afterLoginProcess(token, tokenType, resolve)
      }).catch(reject)
    })
  }

  const sendVerificationEmail = () => {
    return api.post(URI.VERIFY_EMAIL)
  }

  loadLocalStorage()

  Vue.prototype.$auth = {
    setToken,
    fetchUser,
    logout,
    login,
    fbLogin,
    onGoogleSignInSuccess,
    sendVerificationEmail
  }
}
