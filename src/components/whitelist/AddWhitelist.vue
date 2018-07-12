<template>
  <div>
    <b-form-textarea
      class="inputAddress"
      id="inputAddress"
      v-model="inputAddress"
      :state="addressState"
      placeholder="Add whitelist address"
      :rows="3"
      :max-rows="30"/>
    <b-btn variant="info"
           :disabled="!addressState"
           v-on:click="addWhitelists()">추가
    </b-btn>
  </div>
</template>

<script>
  export default {
    name: 'WhitelistAdd',
    data() {
      return {
        whitelists: [],
        inputAddress: '',
      }
    },
    computed: {
      addressState() {
        return this.inputAddress && this.inputAddress.length > 0 ? true : false
      },
    },
    methods: {
      addWhitelists(event) {
        var whitelists = this.inputAddress.split(/\n/);

        if (whitelists.length > 30) {
          alert('최대 30개의 주소까지 추가할 수 있습니다');
          return;
        }
        this.$EventBus.$emit('showProgressModal');
        this.$contract.whitelist.addWhitelists(whitelists)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            console.log(receipt);
            this.$EventBus.$emit('refreshWhitelist');
            this.$EventBus.$emit('hideProgressModal');
            this.inputAddress = '';
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .inputAddress {
    margin-bottom: 7px;
  }
</style>
