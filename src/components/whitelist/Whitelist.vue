<template>
  <div>
    <b-alert show>
      <div>CONTRACT ADDRESS : <a target="_blank" class="alert-link"
                                 v-bind:href="getEtherscanURL('/address/' + contractAddress)">{{contractAddress}}</a>
      </div>
    </b-alert>
    <List class="component"/>
    <AddWhitelist class="component"/>
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
        contractAddress: null
      }
    },
    created() {
      this.contractAddress = localStorage.getItem(this.localStorageKey.whitelistAddress);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
