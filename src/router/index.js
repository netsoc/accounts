import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPrompt from '@/components/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPrompt,
    meta: { title: 'Login' }
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('@/components/CreateAccount.vue'),
    meta: { title: 'Sign up' }
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('@/components/Verify.vue'),
    meta: { title: 'Verify Email' }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/components/Account.vue'),
    meta: { title: 'My Account' }
  },
  {
    path: '/resetPassword',
    name: 'Reset Password',
    component: () => import('@/components/RequestReset.vue'),
    meta: { title: 'Reset Password' }
  },
  {
    path: '/reset',
    name: 'Reset',
    component: () => import('@/components/Reset.vue'),
    meta: { title: 'Reset Password' }
  },
  {
    path: '/cancel',
    name: 'Cancel Payment',
    component: () => import('@/components/Cancel.vue'),
    meta: { title: 'Payment Cancelled' }
  },
  {
    path: '/success',
    name: 'Payment Successful',
    component: () => import('@/components/Success.vue'),
    meta: { title: 'Payment Successful' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
