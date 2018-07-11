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
    async created() {
      this.account = await this.$root.account
    }
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
