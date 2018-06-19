<template>
  <div>
    <textarea v-model='inputAddress'></textarea><button v-on:click='addWhitelists'>추가</button>
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
    methods: {
      addWhitelists(event) {
        var whitelist = this.inputAddress.split(/\n/);

        if (whitelist.length > 30) {
          alert('최대 30개의 주소까지 추가할 수 있습니다');
          return;
        }
        this.$parent.contract.methods.addAddressesToWhitelist(whitelist).send()
        .on('transactionHash', (hash) => {
          console.log('transactionHash: ' + hash);
        })
        .on('receipt', (receipt) => {
          console.log(receipt);
          this.$EventBus.$emit('refreshWhitelist');
          this.inputAddress = '';
        })
        .on('confirmation', (confirmationNumber, receipt) => {
        })
        .on('error', (error) => {
          console.log(error);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
