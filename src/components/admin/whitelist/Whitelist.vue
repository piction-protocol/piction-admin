<template>
  <div>
    <List class="component" :contract="contract"/>
    <AddWhitelist class="component" :contract="contract"/>
  </div>
</template>

<script>
  import Web3 from 'web3'
  import abi from './../../../assets/abi/Whitelist.json'
  import Navi from './../Navi'
  import List from './List'
  import AddWhitelist from './AddWhitelist'

  export default {
    name: 'Whitelist',
    components: {List, AddWhitelist},
    data() {
      return {
        contract: null
      }
    },
    created() {
      web3 = new Web3(web3.currentProvider);
      this.contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS.WHITELIST);
      web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
