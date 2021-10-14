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
        }
    },

    actions: {
        async fetchLogs({ commit }) {
            let payload = await LogService.getLogs(AuthUser.getters.user.id);
            commit("fetch", payload.data)
        },
        async fetchAllLogsToday({ commit }){
            let payload = await LogService.getAllLogsToday();
            commit("fetch", payload.data)
        }
    },

    modules: {
        //
    }
});