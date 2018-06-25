<template>
  <div>
    <b-alert show dismissible fade variant="secondary" class="provider">
      <span class="network">[{{network}}]</span>
      <a target="_blank" class="alert-link"
         v-bind:href="getEtherscanURL('/address/' + account)">{{account}}</a>
    </b-alert>
  </div>
</template>

<script>
  import Web3 from 'web3'

  export default {
    name: 'Provider',
    data() {
      return {
        account: null,
      }
    },
    created() {
      web3 = new Web3(web3.currentProvider);
      web3.eth.getAccounts((err, _account) => {
        this.account = _account[0]
        web3.currentProvider.publicConfigStore.on('update', (provider) => {
          if (this.account.toLowerCase() != provider.selectedAddress.toLowerCase()) {
            window.location.reload()
          }
        });
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .provider {
    margin: 10px;
  }

  .network {
    color: red;
    font-weight: bold;
  }
</style>
