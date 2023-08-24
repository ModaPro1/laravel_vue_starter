import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      token: null,
      userData: null,
      emailExists: false,
      loginError: false
    }
  },
  getters: {
    emailExists(state) {
      return state.emailExists
    },
    loginError(state) {
      return state.loginError
    },
    userAuthenticated(state) {
      return state.userData
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token
      localStorage.setItem("token", payload.token)
    },
  },
  actions: {
    async register(context, payload) {
      const response = await fetch('/api/register', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (data.success) {
        context.commit('setUser', { token: data.token })
        context.state.emailExists = false
      } else {
        if (data.messages.email) {
          context.state.emailExists = true
        }
      }
    },

    async login(context, payload) {
      const response = await fetch('/api/login', {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (data.success) {
        context.state.loginError = ''
        context.commit('setUser', { token: data.token })
      } else {
        context.state.loginError = data.message
      }
    },

    logout(context) {
      localStorage.removeItem('token')
      context.state.token = null
      context.state.userData = null
    },

    async checkAuth(context) {
      const token = localStorage.getItem("token")
      if(token) {
        const response = await fetch('/api/checkAuth', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        if(data) {
          context.state.userData = data.user
        }
      }else {
        context.state.userData = null
      }
    }
  }
})

export default store