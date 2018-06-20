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
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'ProgressModal',
    data() {
      return {
        modalShow: false
      }
    },
    created() {
      this.$EventBus.$on('showProgressModal', () => this.modalShow = true);
      this.$EventBus.$on('hideProgressModal', () => this.modalShow = false);
    }
  }
</script>

<style>
</style>
