import Vue from 'vue'
import Vuex from 'vuex'
import LogService from '@/services/LogService'
import AuthUser from '@/store/AuthUser'

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
            state.data = payload;
        },
        add(state, payload) {
            state.data.push(payload)
        },
    },

    actions: {
        async fetchLogs({ commit }) {
            let payload = await LogService.getLogs(AuthUser.getters.user.id);
            commit("fetch", payload.data)
        },
        async getLogs({ commit },id){
            let res = await LogService.getLogs(id)
            return res.data
        },
        async addTimeIn({ commit },payload){
            let res = await LogService.addTimeIn(payload)
            return res
        },
        async addTimeOut({ commit },payload){
            let res = await LogService.addTimeOut(payload)
            return res
        }
    },

    modules: {
        //
    }
});