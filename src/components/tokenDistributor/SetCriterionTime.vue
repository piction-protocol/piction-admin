<template>
  <div>
    <b-card title="SetCriterionTime"
            img-top
            tag="article">
      <p class="card-text">
        상장시간을 현재시간으로 설정합니다.
      </p>
      <p>현재 설정된 상장시간: {{ criterionTime == 0 ? "없음" : criterionTimeToKST }}</p>
      <b-btn variant="info"
             v-on:click="setCriterionTime">실행
      </b-btn>
      </b-input-group>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL(transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'DistributorSetCriterionTime',
    computed: {
      criterionTimeToKST() {
        return new Date(Number(this.criterionTime)).toLocaleString();
      }
    },
    props: ['contract'],
    data() {
      return {
        criterionTime: 0,
        transactionHash: null,
      }
    },
    methods: {
      getCriterionTime() {
        this.contract.methods.criterionTime().call((err, receipt) => {
          this.criterionTime = receipt
        })
      },
      setCriterionTime() {
        this.$EventBus.$emit('showProgressModal');
        var timestamp = new Date().getTime();
        this.contract.methods.setCriterionTime(timestamp).send()
        .on('transactionHash', (hash) => {
          this.transactionHash = hash;
        })
        .on('receipt', (receipt) => {
          this.$EventBus.$emit('hideProgressModal');
          this.getCriterionTime();
        })
        .on('error', (err) => {
          this.$EventBus.$emit('hideProgressModal');
          alert(err);
        });
      }
    },
    watch: {
      contract() {
        this.getCriterionTime();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
