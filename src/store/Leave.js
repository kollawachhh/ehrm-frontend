import Vue from 'vue'
import Vuex from 'vuex'
import LeaveService from '@/services/LeaveService'
import AuthUser from '@/store/AuthUser'

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
            console.log("hey")
            let payload = await LeaveService.getLeaves(AuthUser.getters.user.id);
            commit("fetch", payload.data)
        }
    },

    modules: {
        //
    }
});