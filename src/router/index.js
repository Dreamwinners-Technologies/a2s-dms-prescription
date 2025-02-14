import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/Home';
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        redirect: { name: 'Dashboard' },
        children: [{
                path: '',
                name: 'Dashboard',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/common/Dashboard.vue')
            },
            {
                path: 'rx-prescription',
                name: 'Create Prescription',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/doctor/CreatePrescription.vue')
            },
            {
                path: 'generic-controller',
                name: 'Generic Controller',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/admin/GenericController.vue')
            },
            {
                path: 'edit-template',
                name: 'Edit Template',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/doctor/EditTemplate.vue')
            },
            {
                path: 'doctor-approve',
                name: 'Doctor Controller',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/admin/ApproveController.vue')
            },
            {
                path: 'card-controller',
                name: 'Card Controller',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/admin/CardController.vue')
            },
            {
                path: 'medicine-request',
                name: 'Medicine Request',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/admin/MedicineRequest.vue')
            },
            {
                path: 'medicine-controller',
                name: 'Medicine Controller',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/admin/MedicineController.vue')
            },
            {
                path: 'ambulance-controller',
                name: 'Ambulance Controller',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/admin/AmbulanceController.vue')
            },
            {
                path: 'research-controller',
                name: 'Research Controller',
                component: () =>
                    import ( /* webpackChunkName: "research" */ '../views/admin/ResearchController.vue')
            },
            {
                path: 'create-appointment',
                name: 'Create Appointment',
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/doctor/CreateAppointment.vue')
            },
            {
                path: 'appointment-list',
                name: 'Appointment List',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/doctor/AppointmentList.vue')
            },
            {
                path: 'fav-medicine',
                name: 'Fav Medicine',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/doctor/FavouriteMedicine.vue')
            },
            {
                path: 'doctor-support',
                name: 'Doctor Support',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/admin/DoctorSupport.vue')
            },
            {
                path: 'about',
                name: 'About',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/common/About.vue')
            },
        ]
    },

    // auth route 

    {
        path: '/auth/signin',
        name: 'SignIn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/auth/SignIn.vue')
    },
    {
        path: '/auth/no-permission',
        name: 'NoPermissionError',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/auth/NoPermissionErr.vue')
    },
    {
        path: '/print/prescription/:id',
        name: 'Prescription By ID',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/pages/PrescriptionById.vue')
    },
    {
        path: '/app/prescription/:id',
        name: 'App Prescription',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/app/AppPrescription.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    console.log()
        // access store via `router.app.$store` here.
    console.log(store.state.adminRole)
        // next()
        // else if ..  from.fullPath != "/auth/signin" && 
    if (store.state.adminRole == true && to.name == "NoPermissionError") {
        next({ name: "Dashboard" });
    } else if (store.state.adminRole == true && store.getters.hasPrescriptionAccess == false) {
        next();
    } else if (store.getters.hasPrescriptionAccess == undefined) {
        next();
    } else if (from.fullPath === "/auth/signin" || to.fullPath === "/auth/signin") {
        next();
    } else if (to.name != "NoPermissionError" && store.getters.hasPrescriptionAccess == false) {
        next({ name: 'NoPermissionError' });
    } else if (to.name == "NoPermissionError" && store.getters.hasPrescriptionAccess == false) {
        next();
    } else if (store.getters.hasPrescriptionAccess == true) {
        next()
    } else if (to.name === "NoPermissionError" && store.getters.hasPrescriptionAccess == true) {
        next({ name: 'Dashboard' });
    } else if (to.name === "Dashboard") {
        next();
    }
})
export default router