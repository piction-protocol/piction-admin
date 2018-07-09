<template>
  <div>
    <b-card title="SetWallet"
            img-top
            tag="article">
      <p class="card-text">
        Wallet의 주소를 변경합니다.
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
    name: 'SaleSetWallet',
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
      async getWalletAddress() {
        this.currentAddress = await Sale.getWalletAddress()
      },
      setWallet() {
        this.$EventBus.$emit('showProgressModal');
        Sale.setWallet(this.address)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.getWalletAddress();
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    },
    created() {
      this.getWalletAddress();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
