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
            state.data = payload;
        },
        add(state, { payload }) {
            state.data.push(payload)
        },
        push(state, payload){
            state.data = payload
        }
    },

    actions: {
        async fetchLeaves({ commit }) {
            let payload = await LeaveService.getLeaves();
            commit("fetch", payload.data)
        },
        async leaves({ commit }, { startDate, endDate, type, totalDate, reason }) {
            let res = await LeaveService.addLeaves({ startDate, endDate, type, totalDate, reason })
            if (res.success) {
                commit("loginSuccess", res)
            }
            return res
        },
        async fetchWaitingLeaves({ commit }) {
            let payload = await LeaveService.getWaitingLeaves();
            commit("fetch", payload.data)
        },
        async fetchWaitingLeavesById({ commit }, id) {
            let payload = await LeaveService.getWaitingLeavesById(id);
            commit("fetch", payload.data[0])
        },
        async updateStatusLeave({ commit }, {id, status}) {
            let payload = await LeaveService.updateStatusLeave(id, status);
            commit("push", payload.data[0])
        }
    },

    modules: {
        //
    }
});