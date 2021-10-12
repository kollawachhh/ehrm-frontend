import Vue from 'vue'
import Vuex from 'vuex'
import LeaveService from '@/services/LeaveService'

Vue.use(Vuex)

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
        }
    },

    actions: {
        async fetchLeaves({ commit }) {
            let payload = await LeaveService.getLeaves();
            commit("fetch", payload)
        }
    },

    modules: {
        //
    }
});