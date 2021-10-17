import Vue from 'vue'
import Vuex from 'vuex'
import LogService from '@/services/LogService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    
    getters: {
        logs: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload.data;
        }
    },

    actions: {
        async fetchLogs({ commit }) {
            let payload = await LogService.getLogs();
            commit("fetch", payload)
        },
        async fetchLogsByDate({ commit }, date) {
            let payload = await LogService.getLogsByDate(date);
            commit("fetch", payload)
        },
        async addTimeIn({ commit },payload){
            let res = await LogService.addTimeIn(payload)
            return res
        },
        async addTimeOut({ commit },payload){
            let res = await LogService.addTimeOut(payload)
            return res
        },
        async getLogs({ commit }){
            let res = await LogService.getLogs()
            return res.data
        },
    },

    modules: {
        //
    }
});