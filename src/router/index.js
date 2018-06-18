import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/components/Wallet'
import PXL from '@/components/admin/pxl/PXL'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/admin',
      redirect: '/admin/pxl',
    },
    {
      path: '/admin/pxl',
      name: 'PXL',
      component: PXL
    }
  ]
})
