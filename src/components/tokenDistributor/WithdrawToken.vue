<template>
  <div>
    <b-card title="WithdrawToken"
            img-top
            tag="article">
      <p class="card-text">
        남은 토큰을 회수합니다.
      </p>
      <b-input-group>
        <b-btn variant="info"
               v-on:click="withdrawToken()">실행
        </b-btn>
      </b-input-group>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL('/tx/' + transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'DistributorWithdrawToken',
    data() {
      return {
        transactionHash: null,
      }
    },
    methods: {
      async withdrawToken() {
        const tokenDistributorAddress = await this.$contract.sale.getTokenDistributorAddress();
        const tokenBalance = await this.$contract.pxl.balanceOf(tokenDistributorAddress)

        if (tokenBalance == 0) {
          alert('TokenDistributor에 Token이 없습니다');
          return;
        }

        this.$EventBus.$emit('showProgressModal');
        this.$contract.tokenDistributor.withdrawToken()
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.$EventBus.$emit('updateTokenInfo');
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
