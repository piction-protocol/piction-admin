import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/components/Wallet'
import PXL from '@/components/admin/pxl/PXL'
import Whitelist from '@/components/admin/whitelist/Whitelist'

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
    },
    {
      path: '/admin/whitelist',
      name: 'Whitelist',
      component: Whitelist
    }
  ]
})
