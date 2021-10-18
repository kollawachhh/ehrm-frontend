import Vue from 'vue'
import Vuex from 'vuex'
import AdminService from '@/services/AdminService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },

    getters: {
        users: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload;
        },
        push(state, payload){
            state.data = payload
        }
    },

    actions: {
        async fetchAllUser({ commit }) {
            let payload = await AdminService.getAllUser();
            commit("fetch", payload.data)
        },
        async fetchUser({ commit }, userId){
            let payload = await AdminService.getUser(userId);
            commit("fetch", payload.data)
        },
        async createUser({ commit }, newUser){
            let payload = await AdminService.createUser(newUser);
            commit("push", payload.data)
        },
    },

    modules: {
        //
    }
});