import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userLoginResponse: {},
        currentLoggedUserType: "",
    },
    mutations: {
        setUserLoginResponse(state, data) {
            state.userLoginResponse = data;
        },
        setCurrentLoggedUserType(state, data) {
            state.currentLoggedUserType = data;
        },
    },
    actions: {},
    modules: {},
    getters: {
        userLoginResponse: state => state.userLoginResponse,
        currentLoggedUserType: state => state.currentLoggedUserType,
    }
})