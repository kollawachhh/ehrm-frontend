import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'

Vue.use(Vuex)

const auth_key = "auth-ehrm"
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
  user: auth ? auth.user : "",
  jwt: auth ? auth.jwt : "",
  isAuthen: auth ? true : false,
}

export default new Vuex.Store({
  state: initialState,

  mutations: {
    loginSuccess(state, payload) {
      state.user = payload.user
      state.jwt = payload.jwt
      state.isAuthen = true 
    },
    logoutSuccess(state) {
      state.user = ""
      state.jwt = ""
      state.isAuthen = false
    },
  },

  actions: {
    async login({ commit }, { password, username }) {
      let res = await AuthService.login({ password, username })
      console.log(res)
      if (res.success) {
        commit("loginSuccess", res)
        return res
      } else {
        return "failed"
      }
    },
    logout({ commit }) {
      AuthService.logout()
      commit("logoutSuccess")
    },
    // async register({ commit }, { username, email, password }) {
    //   let res = await AuthService.register({ username, email, password })
    //   if (res.success) {
    //     commit("loginSuccess", res)
    //   }
    //   return res
    // },
    // async update({ commit }, { id, total_points, max_points }) {
    //   let res = await AuthService.update({ id, total_points, max_points })
    //   console.log(res)
    //   if (res.success) {
    //     commit("loginSuccess", res)
    //   }
    //   return res
    // },
  },

  getters: {
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    isAuthen: (state) => state.isAuthen,
  },

  modules: {
  }
})
