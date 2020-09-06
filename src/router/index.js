import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'jobs',
        component: () =>
        import ( /* webpackChunkName: "contacts" */ '../views/Jobs.vue'),
    },
    {
        path: '/settings',
        name: 'settings',
        component: () =>
            import ( /* webpackChunkName: "settings" */ '../views/Settings.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
