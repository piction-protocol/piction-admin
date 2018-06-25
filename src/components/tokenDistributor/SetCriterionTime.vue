<template>
  <div>
    <b-card title="SetCriterionTime"
            img-top
            tag="article">
      <p class="card-text">
        상장시간을 현재시간으로 설정합니다.
      </p>
      <p>현재 설정된 상장시간: {{ registedCriterionTime == 0 ? "없음" : criterionTimeToKST }}</p>
      <b-input-group>
        <b-form-input id="criterionDateTime"
                      v-model.trim="criterionDateTime"
                      type="datetime-local"
                      :state="criterionDateTimeState"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!criterionDateTimeState"
                 v-on:click="setCriterionTime">실행
          </b-btn>
        </b-input-group-append>
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
    name: 'DistributorSetCriterionTime',
    computed: {
      criterionDateTimeState() {
        return this.criterionDateTime && this.criterionDateTime.length > 0 ? true : false;
      },
      criterionTimeToKST() {
        return new Date(Number(this.registedCriterionTime)).toLocaleString();
      }
    },
    props: ['contract'],
    data() {
      return {
        criterionDateTime: null,
        registedCriterionTime: 0,
        transactionHash: null,
      }
    },
    methods: {
      getCriterionTime() {
        this.contract.methods.criterionTime().call((err, receipt) => {
          this.registedCriterionTime = receipt
        })
      },
      setCriterionTime() {
        var timestamp = Date.parse(criterionDateTime.value)
        this.$EventBus.$emit('showProgressModal');
        this.contract.methods.setCriterionTime(timestamp).send()
        .on('transactionHash', (hash) => {
          this.$EventBus.$emit('SetMessageProgressModal', hash);
        })
        .on('receipt', (receipt) => {
          this.transactionHash = receipt.transactionHash;
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
