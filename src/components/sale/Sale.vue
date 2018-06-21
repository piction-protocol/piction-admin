<template>
  <div>
    <SaleInfo class="component" :contract="contract"/>
    <SaleState class="component" :contract="contract"/>
    <SaleRegisterProduct class="component" :contract="contract"/>
    <SaleSetWallet class="component" :contract="contract"/>
    <SaleSetWhitelist class="component" :contract="contract"/>
    <SaleSetTokenDistributor class="component" :contract="contract"/>
    <SaleRefund class="component" :contract="contract"/>
    <SaleBuyerAddressTranster class="component" :contract="contract"/>
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
    },
    data() {
      return {
        contract: null
      }
    },
    created() {
      web3 = new Web3(web3.currentProvider);
      this.contract = new web3.eth.Contract(abi, localStorage.getItem(this.localStorageKey.saleAddress));
      web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component {
    margin-bottom: 10px;
  }
</style>
