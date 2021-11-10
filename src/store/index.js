import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getPrescriptionAccessDetails() {
    try {
        return (JSON.parse(localStorage.getItem("uData")).hasPrescriptionAccess);
    } catch (e) {
        return undefined;
    }
}

function hasAdminRole() {
    console.log()
    try {
        let roles = (JSON.parse(localStorage.getItem("uData")).roles),
            hasAdminRole = roles.includes("ADMIN");
        return hasAdminRole;
    } catch (e) {
        console.log(e)
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