<template>
  <div>
    <b-card title="ReleaseByCount"
            img-top
            tag="article">
      <p class="card-text">
        갯수별로 Release 합니다.
      </p>
      <b-input-group>
        <b-form-input id="releaseCount"
                      v-model.trim="releaseCount"
                      type="number"
                      :state="releaseCountState"
                      placeholder="Count"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!releaseCountState"
                 v-on:click="releaseByCount()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
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
    name: 'DistributorreleaseByCount',
    computed: {
      releaseCountState() {
        return this.releaseCount && this.releaseCount > 0 ? true : false
      },
    },
    props: ['contract'],
    data() {
      return {
        releaseCount: null,
        transactionHash: null,
      }
    },
    methods: {
      releaseByCount() {
        this.$EventBus.$emit('showProgressModal');
        this.contract.methods.releaseByCount(this.releaseCount).send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.$EventBus.$emit('hideProgressModal');
            this.$EventBus.$emit('updateReceipt');
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
