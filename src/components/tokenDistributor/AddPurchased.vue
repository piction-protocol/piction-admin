<template>
  <div>
    <b-card title="AddPurchased"
            img-top
            tag="article">
      <p class="card-text">
        Purchase 정보를 등록합니다.
      </p>
      <b-input-group>
        <b-form-input id="productAddress"
                      v-model.trim="productAddress"
                      type="text"
                      :state="productAddressState"
                      placeholder="Product Address"></b-form-input>
        <b-form-input id="buyerAddress"
                      v-model.trim="buyerAddress"
                      type="text"
                      :state="buyerAddressState"
                      placeholder="buyer Address"></b-form-input>
        <b-form-input id="amount"
                      v-model.trim="amount"
                      type="text"
                      :state="amountState"
                      placeholder="Amount"></b-form-input>
        <b-form-input id="etherAmount"
                      v-model.trim="etherAmount"
                      type="text"
                      :state="etherAmountState"
                      placeholder="Ether Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!productAddressState || !buyerAddressState || !amountState || !etherAmountState"
                 v-on:click="addPurchased()">실행
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
    name: 'DistributorAddPurchased',
    computed: {
      productAddressState() {
        return this.productAddress && this.productAddress.length > 0 ? true : false
      },
      buyerAddressState() {
        return this.buyerAddress && this.buyerAddress.length > 0 ? true : false
      },
      amountState() {
        return this.amount && this.amount > 0 ? true : false
      },
      etherAmountState() {
        return this.etherAmount ? true : false
      },
    },
    data() {
      return {
        productAddress: null,
        buyerAddress: null,
        amount: null,
        etherAmount: null,
        transactionHash: null,
      }
    },
    methods: {
      addPurchased(amount, etherAmount) {
        this.$EventBus.$emit('showProgressModal');
        this.$contract.tokenDistributor.addPurchased(this.buyerAddress, this.productAddress, this.amount, this.etherAmount)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.$EventBus.$emit('updateReceipt');
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
