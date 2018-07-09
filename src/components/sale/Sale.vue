<template>
  <div>
    <SaleInfo class="component"/>
    <SaleState class="component"/>
    <SaleRegisterProduct class="component"/>
    <SaleSetWallet class="component"/>
    <SaleSetWhitelist class="component"/>
    <SaleSetTokenDistributor class="component"/>
    <SaleRefund class="component"/>
    <SaleBuyerAddressTranster class="component"/>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import abi from '../../assets/abi/Sale.json';
  import SaleInfo from './SaleInfo';
  import SaleState from './SaleState';
  import SaleRegisterProduct from './RegisterProduct';
  import SaleSetWallet from './SetWallet';
  import SaleSetWhitelist from './SetWhitelist';
  import SaleSetTokenDistributor from './SetTokenDistributor';
  import SaleRefund from './Refund';
  import SaleBuyerAddressTranster from './BuyerAddressTransfer'

  export default {
    name: 'Sale',
    components: {
      SaleInfo,
      SaleState,
      SaleRegisterProduct,
      SaleSetWallet,
      SaleSetWhitelist,
      SaleSetTokenDistributor,
      SaleRefund,
      SaleBuyerAddressTranster
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component {
    margin-bottom: 10px;
  }
</style>
