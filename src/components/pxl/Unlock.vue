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
                             v-bind:href="getEtherscanURL('/tx/' + transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  import PXL from '../../contracts/PXL'

  export default {
    name: 'PXLUnlock',
    data() {
      return {
        isLocked: false,
        transactionHash: null
      }
    },
    methods: {
      async getLockState() {
        this.isLocked = await PXL.getLockState()
      },
      unlock() {
        this.$EventBus.$emit('showProgressModal');
        PXL.unlock()
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
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
