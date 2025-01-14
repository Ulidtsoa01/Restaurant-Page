import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingView from '../views/LandingView.vue'
import ClientView from '../views/ClientView.vue'
import ServerView from '../views/ServerView.vue'
import ManagerView from '../views/ManagerView.vue'
import LoginView from '../views/LoginView.vue'
import CheckoutView from '../views/ClientCheckoutView.vue'
import CheckoutCompleteView from '../views/ClientCheckoutComplete.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingView
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView
  },
  {
    path: '/checkout',
    name: 'ClientCheckoutView',
    component: CheckoutView
  },
  {
    path: '/checkoutComplete',
    name: 'ClientCheckoutComplete',
    component: CheckoutCompleteView
  },
  {
    path: '/server/:credential?',
    name: 'server',
    component: ServerView
  },
  {
    path: '/manager/:credential?',
    name: 'manager',
    component: ManagerView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
