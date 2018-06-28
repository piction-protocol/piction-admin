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
  import tokenAbi from '../../assets/abi/PXL.json';

  export default {
    name: 'TokenDistributorTokenInfo',
    props: ['contract', 'tokenBalance'],
    data() {
      return {
        contractAddress: null,
      }
    },
    watch: {
      contract() {
        this.contractAddress = this.contract.options.address;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
