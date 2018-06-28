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
               :disabled="!tokenState"
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
  import BigNumber from 'bignumber.js';

  export default {
    name: 'DistributorWithdrawToken',
    computed: {
      tokenState() {
        return this.token && this.token > 0 ? true : false
      }
    },
    props: ['contract', 'tokenBalance'],
    data() {
      return {
        token: null,
        transactionHash: null,
      }
    },
    methods: {
      withdrawToken() {
        if (this.token == 0) {
          alert('TokenDistributor에 Token이 없습니다');
          return;
        }

        this.$EventBus.$emit('showProgressModal');
        this.contract.methods.withdrawToken().send()
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.$EventBus.$emit('updateTokenInfo');
            this.token = 0;
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    },
    watch: {
      tokenBalance() {
        this.token = this.tokenBalance;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
