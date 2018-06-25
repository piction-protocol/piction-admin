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
  import BigNumber from 'bignumber.js';

  export default {
    name: 'PXLContractInfo',
    props: ['contract'],
    data() {
      return {
        totalSupply: null,
        contractAddress: null,
      }
    },
    methods: {
      getTotalSupply() {
        this.contract.methods.totalSupply().call((err, receipt) => {
          this.totalSupply = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        });
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
