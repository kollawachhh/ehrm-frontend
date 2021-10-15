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
        async logout({ commit }) {
            AuthService.logout()
            commit("logoutSuccess")
        },
    },

    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen,
    },

    modules: {}
})