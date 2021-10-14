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
            console.log(payload.data)
            commit("fetch", payload.data)
        }
    },

    modules: {
        //
    }
});