import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/case',
    name: 'Case',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Case.vue')
  },
  {
    path: '/mutator',
    name: 'Mutator',
    component: () => import('../views/Mutator.vue')
  },
  {
    path: '/query',
    name: 'Query',
    component: () => import('../views/Query.vue')
  },
  {
    path: '/wip',
    name: 'Wip',
    component: () => import('../views/Wip.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
