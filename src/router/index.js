import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPrompt from '@/components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPrompt
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('@/components/CreateAccount.vue')
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('@/components/Verify.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/components/Account.vue')
  },
  {
    path: '/renew',
    name: 'Renew',
    component: () => import('@/components/Renew.vue')
  },
  {
    path: '/resetPassword',
    name: 'Reset Password',
    component: () => import('@/components/RequestReset.vue')
  },
  {
    path: '/reset',
    name: 'Reset',
    component: () => import('@/components/Reset.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
