import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Wallet from '@/components/Wallet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    }
  ]
})
