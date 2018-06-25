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
  import tokenAbi from '../../assets/abi/PXL.json';
  import BigNumber from 'bignumber.js';

  export default {
    name: 'TokenDistributorTokenInfo',
    props: ['contract'],
    data() {
      return {
        tokenContract: null,
        totalSupply: null,
        contractAddress: null,
      }
    },
    methods: {
      getTotalSupply() {
        this.tokenContract.methods.totalSupply().call((err, receipt) => {
          this.totalSupply = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        });
      }
    },
    watch: {
      contract() {
        this.contractAddress = this.contract.options.address;
        this.contract.methods.getTokenAddress().call((err, tokenAddress) => {
          this.tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
          this.getTotalSupply();
        });

      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
