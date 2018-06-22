<template>
  <div>
    <b-modal
      v-model="modalShow"
      :centered="true"
      :no-close-on-backdrop="true"
      :hide-header="true"
      :hide-footer="true">
      <h5>잠시 기다려주세요!</h5>
      <b-progress :value="100" variant="danger" :animated="true"></b-progress>
      <div v-if="transactionHash" class="transaction">
        <a target="_blank" v-bind:href="getEtherscanURL(transactionHash)">{{transactionHash}}</a>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'ProgressModal',
    data() {
      return {
        modalShow: false,
        transactionHash: null
      }
    },
    created() {
      this.$EventBus.$on('showProgressModal', () => {
        this.transactionHash = null;
        this.modalShow = true;
      });
      this.$EventBus.$on('hideProgressModal', () => this.modalShow = false);
      this.$EventBus.$on('SetMessageProgressModal', (hash) => {
        this.transactionHash = hash;
      });
    }
  }
</script>

<style>
  .transaction {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
