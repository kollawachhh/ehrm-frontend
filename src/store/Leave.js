import Vue from 'vue'
import Vuex from 'vuex'
import LeaveService from '@/services/LeaveService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

const auth_key = "auth-ehrm"
let auth = JSON.parse(localStorage.getItem(auth_key))

export default new Vuex.Store({
    state: {
        data: [],
    },

    getters: {
        leaves: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload;
        },
        add(state, { payload }) {
            state.data.push(payload)
        }
    },

    actions: {
        async fetchLeaves({ commit }) {
            let payload = await LeaveService.getLeaves(AuthUser.getters.user.id);
            commit("fetch", payload.data)
        },
        async leaves({ commit }, { startDate, endDate, type, total, reason, id }) {
            let res = await LeaveService.addLeaves({ startDate, endDate, type, total, reason, id })
            if (res.success) {
                commit("loginSuccess", res)
            }
            return res
        }
    },

    modules: {
        //
    }
});