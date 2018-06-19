<template>
  <div>
    <ContractInfo class="component" :contract="contract"/>
    <Mint class="component" :contract="contract"/>
    <Burn class="component" :contract="contract"/>
    <BalanceOf class="component" :contract="contract"/>
    <Transfer class="component" :contract="contract"/>
    <AddOwner class="component" :contract="contract"/>
  </div>
</template>

<script>
  import Web3 from 'web3'
  import abi from './../../../assets/abi/PXL.json';
  import ContractInfo from './ContractInfo'
  import Mint from './Mint'
  import Burn from './Burn'
  import BalanceOf from './BalanceOf'
  import Transfer from './Transfer'
  import AddOwner from './AddOwner'

  export default {
    name: 'PXL',
    components: {ContractInfo, Mint, Burn, BalanceOf, Transfer, AddOwner},
    data() {
      return {
        contract: null,
      }
    },
    methods: {},
    created() {
      web3 = new Web3(web3.currentProvider);
      this.contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS.PXL);
      web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component {
    margin-bottom: 10px;
  }
</style>
