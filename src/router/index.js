import Vue from 'vue'
import Router from 'vue-router'
import PXL from '@/components/pxl/PXL'
import Whitelist from '@/components/whitelist/Whitelist'
import Sale from '@/components/sale/Sale'
import TokenDistributor from '@/components/tokenDistributor/TokenDistributor'
import Setting from '@/components/setting/Setting'

Vue.use(Router)

const invailidPath = (to, name, addressKey) => {
  return to.name == name && !localStorage.getItem(addressKey)
}

const require = async (to, from, next) => {
  const app = await router.app;
  if (invailidPath(to, 'PXL', app.localStorageKey.PXLAddress) ||
    invailidPath(to, 'Whitelist', app.localStorageKey.whitelistAddress) ||
    invailidPath(to, 'Sale', app.localStorageKey.saleAddress) ||
    invailidPath(to, 'TokenDistributor', app.localStorageKey.saleAddress)) {
    alert('Contract address 를 등록해주세요')
    return next({path: '/setting'})
  } else {
    const checkContract = setInterval(function() {
      if (Vue.prototype.$contract.tokenDistributor != undefined && Vue.prototype.$contract.product != undefined) {
        clearInterval(checkContract)
        return next();
      }
    }, 500);
  }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/pxl',
    },
    {
      path: '/pxl',
      name: 'PXL',
      component: PXL,
      beforeEnter: require
    },
    {
      path: '/whitelist',
      name: 'Whitelist',
      component: Whitelist,
      beforeEnter: require
    },
    {
      path: '/sale',
      name: 'Sale',
      component: Sale,
      beforeEnter: require
    },
    {
      path: '/tokenDistributor',
      name: 'TokenDistributor',
      component: TokenDistributor,
      beforeEnter: require
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
});
export default router;
