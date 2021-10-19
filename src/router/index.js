import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout/Home'

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
        name: 'No Permission Error',
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

export default router