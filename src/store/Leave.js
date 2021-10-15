import Vue from 'vue'
import Vuex from 'vuex'
import LeaveService from '@/services/LeaveService'

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
            state.data = payload.data;
        },
        add(state, { payload }) {
            state.data.push(payload)
        }
    },

    actions: {
        async fetchLeaves({ commit }) {
            let payload = await LeaveService.getLeaves();
            commit("fetch", payload.data)
        },
        async leaves({ commit }, { startDate, endDate, type, totalDate, reason, id }) {
            console.log(startDate)
            let res = await LeaveService.addLeaves({ startDate, endDate, type, totalDate, reason, id })
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