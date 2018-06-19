<template>
  <div>
    <b-card title="Burn"
            img-top
            tag="article">
      <p class="card-text">
        PXL 토큰을 소각합니다.
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
                 v-on:click="burn()">실행
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
    name: 'PXLBurn',
    computed: {
      amountState() {
        return parseInt(this.amount) > 0 ? true : false
      },
    },
    props: ['contract'],
    data() {
      return {
        amount: null,
        progress: false,
        transactionHash: null,
      }
    },
    methods: {
      burn() {
        this.progress = true;
        let amount = new BigNumber(this.amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
        this.contract.methods.burn(amount).send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.progress = false;
            this.$parent.getTotalSupply();
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
