<template>
  <div>
    <b-card title="SetTokenDistributor"
            img-top
            tag="article">
      <p class="card-text">
        Token Distributor의 주소를 변경합니다. (State가 Unknown, Preparing 또는 Finished일때 가능)<br><b>주의! 부득이한 상황에서만 사용하세요!</b>
      </p>
      <p>현재주소: {{ currentAddress }}</p>
      <b-input-group>
        <b-form-input id="address"
                      v-model.trim="address"
                      type="text"
                      :state="addressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!addressState"
                 v-on:click="setWallet()">실행
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
  import Sale from '../../contracts/Sale'

  export default {
    name: 'SaleSetTokenDistributor',
    computed: {
      addressState() {
        return this.address && this.address.length > 0 ? true : false
      },
    },
    data() {
      return {
        currentAddress: null,
        address: null,
        transactionHash: null,
      }
    },
    methods: {
      async getTokenDistributorAddress() {
        this.currentAddress = await Sale.getTokenDistributorAddress()
      },
      setWallet() {
        this.$EventBus.$emit('showProgressModal');
        Sale.setTokenDistributor(this.address)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.getTokenDistributorAddress();
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    },
    created() {
      this.getTokenDistributorAddress();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
