<template>
  <div>
    <b-alert show>
      <div>BALANCEOF : {{ tokenBalance > 0 ? tokenBalance + "PXL" : "보유토큰 없음" }}</div>
      <div>CONTRACT ADDRESS : <a target="_blank" class="alert-link"
                                 v-bind:href="getEtherscanURL('/address/' + contractAddress)">{{contractAddress}}</a>
      </div>
    </b-alert>
  </div>
</template>

<script>
  export default {
    name: 'TokenDistributorTokenInfo',
    data() {
      return {
        tokenBalance: null,
        contractAddress: null,
      }
    },
    methods: {
      async getBalanceOf() {
        this.contractAddress = await this.$contract.sale.getTokenDistributorAddress();
        this.tokenBalance = await this.$contract.pxl.balanceOf(this.contractAddress)
      }
    },
    async created() {
      this.getBalanceOf()
      this.$EventBus.$on('updateTokenInfo', () => this.getBalanceOf());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
