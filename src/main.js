// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import PictionAdminPlugin from './plugins/piction-admin-plugin'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Web3 from 'web3'
web3 = new Web3(web3.currentProvider);

Vue.config.productionTip = false
Vue.use(BootstrapVue);

(async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0].toLowerCase();
  Vue.use(PictionAdminPlugin, {account: account});

  const networks = [null, 'mainnet', 'morden', 'ropsten'];
  const netId = await web3.eth.net.getId();

  Vue.prototype.$EventBus = new Vue();

  Vue.mixin({
    data() {
      return {
        network: networks[parseInt(netId)],
        localStorageKey: {
          PXLAddress: 'PXLAddress',
          whitelistAddress: 'whitelistAddress',
          saleAddress: 'saleAddress',
        }
      }
    },
    methods: {
      getEtherscanURL(path) {
        if (this.network == 'mainnet') {
          return `https://etherscan.io${path}`
        } else {
          return `https://${this.network}.etherscan.io${path}`
        }
      },
    },
  })

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    components: {App},
    template: '<App/>',
    data: {
      account: account
    },
    methods: {
      reload() {
        this.$router.push('/')
        window.location.reload()
      }
    },
    components: {App},
    template: '<App/>',
    created() {
      web3.currentProvider.publicConfigStore.on('update', (provider) => {
        if (this.account != provider.selectedAddress.toLowerCase()) this.reload();
      });
    }
  })
})();
