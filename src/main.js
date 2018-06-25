// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);

web3.version.getNetwork((err, netId) => {
  const networks = [null, 'mainnet', 'morden', 'ropsten'];
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

  Vue.prototype.$EventBus = new Vue();

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    components: {App},
    template: '<App/>'
  })
});

