import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import("@/views/Dashboard.vue")
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import("@/views/Reports.vue")
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import("@/views/Settings.vue")
  },
  {
    path: '/resource/upload',
    name: 'Uploads',
    component: () => import("@/views/Uploads.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/god/eye',
    name: 'EyeOfGod',
    component: () => import('@/views/EyeOfGod.vue'),
  },
  {
    path: '/god/mouth',
    name: 'MouthOfGod',
    component: () => import('@/views/MouthOfGod.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
