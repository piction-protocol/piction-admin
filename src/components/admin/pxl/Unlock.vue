<template>
  <div>
    <b-card title="Unlock"
            img-top
            tag="article">
      <p class="card-text">
        Token을 lock을 해제합니다. (lock을 해제하면 다시 lock을 할 수 없습니다.)
      </p>
      <div>현재 상태: {{ isLocked ? "Locked" : "Unlocked" }}</div>
      <b-btn variant="info"
             :disabled="!isLocked"
             v-if="isLocked"
             v-on:click="unlock">변경
      </b-btn>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL(transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'PXLUnlock',
    props: ['contract'],
    data() {
      return {
        isLocked: false,
        transactionHash: null
      }
    },
    methods: {
      getLockState() {
        this.contract.methods.getTokenTransferable().call((err, receipt) => {
          this.isLocked = !receipt;
        });
      },
      unlock() {
        this.$EventBus.$emit('showProgressModal');
        this.contract.methods.unlock().send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.$EventBus.$emit('hideProgressModal');
            this.getLockState();
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    },
    created() {
      this.getLockState();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
