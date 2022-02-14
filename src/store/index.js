import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function getPrescriptionAccessDetails() {
    try {
        return (JSON.parse(localStorage.getItem("uData")).hasPrescriptionAccess);
    } catch (e) {
        return undefined;
    }
}

function hasAdminRole() {
    try {
        let user = JSON.parse(localStorage.getItem("uData"));
            return user.roles.includes("SUPER_ADMIN") || user.roles.includes("ADMIN") || user.roles.includes("MODERATOR");

    } catch (e) {
        return undefined;
    }
}

export default new Vuex.Store({
    state: {
        userLoginResponse: {},
        currentLoggedUserType: "",
        hasPrescriptionAccess: getPrescriptionAccessDetails(),
        adminRole: hasAdminRole(),
    },
    mutations: {
        setUserLoginResponse(state, data) {
            state.userLoginResponse = data;
        },
        setCurrentLoggedUserType(state, data) {
            state.currentLoggedUserType = data;
        },
        setHasPrescriptionAccess(state, data) {
            state.hasPrescriptionAccess = data;
        },
    },
    actions: {},
    modules: {},
    getters: {
        userLoginResponse: state => state.userLoginResponse,
        currentLoggedUserType: state => state.currentLoggedUserType,
        hasPrescriptionAccess: state => state.hasPrescriptionAccess,
        adminRole: state => state.adminRole
    }
})