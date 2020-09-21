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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
