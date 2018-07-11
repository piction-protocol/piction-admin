<template>
  <div>
    <b-alert show>
      <div>TOTAL SUPPLY : {{totalSupply}} PXL</div>
      <div>CONTRACT ADDRESS : <a target="_blank" class="alert-link"
                                 v-bind:href="getEtherscanURL('/address/' + contractAddress)">{{contractAddress}}</a>
      </div>
    </b-alert>
  </div>
</template>

<script>
  export default {
    name: 'PXLContractInfo',
    data() {
      return {
        totalSupply: null,
        contractAddress: null,
      }
    },
    methods: {
      async getTotalSupply() {
        this.totalSupply = await this.$contract.pxl.totalSupply()
      }
    },
    created() {
      this.getTotalSupply();
      this.contractAddress = localStorage.getItem(this.localStorageKey.PXLAddress);
      this.$EventBus.$on('setTotalSupply', () => this.getTotalSupply());
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
