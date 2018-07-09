<template>
  <div id="app">
    <Navi/>
    <Provider/>
    <router-view class="container"/>
    <ProgressModal/>
  </div>
</template>

<script>
  import Web3 from 'web3'
  import Navi from './components/Navi'
  import Provider from './components/Provider'
  import ProgressModal from './components/ProgressModal'

  import Sale from './contracts/Sale'
  import PXL from './contracts/PXL'
  import Whitelist from './contracts/Whitelist'
  import Product from './contracts/Product'

  export default {
    name: 'App',
    components: {Navi, Provider, ProgressModal},
    async beforeCreate() {
      web3 = new Web3(web3.currentProvider);
      Sale.init();
      PXL.init();
      Whitelist.init();
      Product.init(await Sale.getProductAddress());
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
  }

  .container {
    margin: 12px auto 70px auto;
  }
</style>
