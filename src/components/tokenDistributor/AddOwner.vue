<template>
  <div>
    <b-card title="AddOwner"
            img-top
            tag="article">
      <p class="card-text">
        TokenDistributor에 Sale을 Owner로 등록합니다.
      </p>
      <b-input-group>
        <b-form-input id="saleAddress"
                      v-model.trim="saleAddress"
                      type="text"
                      :state="saleAddressState"
                      placeholder="Sale Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!saleAddressState"
                 v-on:click="addOwner">실행
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
    name: 'DistributorAddOwner',
    computed: {
      saleAddressState() {
        return this.saleAddress && this.saleAddress.length > 0 ? true : false
      }
    },
    data() {
      return {
        saleAddress: null,
        transactionHash: null,
      }
    },
    methods: {
      addOwner() {
        this.$EventBus.$emit('showProgressModal');
        this.$contract.tokenDistributor.addOwner(this.saleAddress)
        .on('transactionHash', (hash) => {
          this.$EventBus.$emit('SetMessageProgressModal', hash);
        })
        .on('receipt', (receipt) => {
          this.transactionHash = receipt.transactionHash;
          this.$EventBus.$emit('hideProgressModal');
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
