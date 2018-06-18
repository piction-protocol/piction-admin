<template>
  <div>
    <b-card title="Mint"
            img-top
            tag="article">
      <p class="card-text">
        PXL 토큰을 추가 발행합니다. 발행된 토큰은 오너의 계좌로 전송됩니다.
      </p>
      <b-input-group>
        <b-form-input id="amount"
                      v-model.trim="amount"
                      type="text"
                      :state="amountState"
                      placeholder="Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!amountState || progress"
                 v-on:click="mint()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-progress v-if="progress" :value="100" variant="danger" :animated="true"></b-progress>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL(transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js';

  export default {
    name: 'PXLMint',
    computed: {
      amountState() {
        return parseInt(this.amount) > 0 ? true : false
      },
    },
    data() {
      return {
        amount: null,
        progress: false,
        transactionHash: null,
      }
    },
    methods: {
      mint() {
        this.progress = true;
        let amount = new BigNumber(this.amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
        this.$parent.contract.methods.mint(amount).send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.progress = false;
            this.$EventBus.$emit('setTotalSupply')
          })
          .on('error', (err) => {
            this.progress = false;
            alert(err);
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
