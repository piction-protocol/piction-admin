import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/components/Wallet'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wallet',
      component: Wallet
    }, {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
