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
    path: '/booking-v2',
    name: 'Booking-v2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Booking-v2/Index.vue')
  },
  {
    path: '/booking',
    name: 'Booking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Booking/Index.vue'),
    redirect: '/booking/dates',
    children: [
      {
        path: '/booking/dates',
        name: 'Date Selection',
        component: () => import(/* webpackChunkName: "dates" */ '../views/Booking/steps/DateSelection.vue')
      },
      {
        path: '/booking/room-specs',
        name: 'Room Specs',
        component: () => import(/* webpackChunkName: "room-specs" */ '../views/Booking/steps/RoomSpecs.vue')
      },
      {
        path: '/booking/payment',
        name: 'Payment',
        component: () => import(/* webpackChunkName: "payment" */ '../views/Booking/steps/Payment.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
