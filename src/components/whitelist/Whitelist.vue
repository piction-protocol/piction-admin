<template>
  <div>
    <b-alert show>
      <div>CONTRACT ADDRESS : <a target="_blank" class="alert-link"
                                 v-bind:href="getEtherscanURL('/address/' + contractAddress)">{{contractAddress}}</a>
      </div>
    </b-alert>
    <List class="component" :contract="contract"/>
    <AddWhitelist class="component" :contract="contract"/>
  </div>
</template>

<script>
  import Web3 from 'web3'
  import abi from '../../assets/abi/Whitelist.json'
  import Navi from '../Navi'
  import List from './List'
  import AddWhitelist from './AddWhitelist'

  export default {
    name: 'Whitelist',
    components: {List, AddWhitelist},
    data() {
      return {
        contract: null,
        contractAddress: null
      }
    },
    created() {
      this.contract = new web3.eth.Contract(abi, localStorage.getItem(this.localStorageKey.whitelistAddress));
      web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
      this.contractAddress = localStorage.getItem(this.localStorageKey.whitelistAddress);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
