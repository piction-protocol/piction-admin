<template>
  <div>
    <b-card title="RegisterProduct"
            img-top
            tag="article">
      <p class="card-text">
        Product의 주소를 변경합니다. (State가 Unknown, Preparing 또는 Finished일때 가능)
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
                 v-on:click="registerProduct()">실행
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
    name: 'SaleRegisterProduct',
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
      async getProductAddress() {
        this.currentAddress = await Sale.getProductAddress()
      },
      registerProduct() {
        // state가 preparing이거나 finish일 때만 변경가능해야 함.
        // isRegistered에 등록안되서 true가 아니어야 함
        this.$EventBus.$emit('showProgressModal');
        Sale.registerProduct(this.address)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.getProductAddress();
            this.$EventBus.$emit('changedState');
            this.$EventBus.$emit('changedProduct');
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    },
    created() {
      this.getProductAddress();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
