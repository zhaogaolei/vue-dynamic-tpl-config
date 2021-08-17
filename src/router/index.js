import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName:"index" */ '../views/index.vue')
  },
  {
    path: '/hoteldesign',
    name: 'hoteldesign',
    component: () => import(/* webpackChunkName:"hoteldesign" */ '../views/hotel-design.vue')
  },
  {
    path: '/activitydesign',
    name: 'activitydesign',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName:"activitydesign" */ '../views/activity-design.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
