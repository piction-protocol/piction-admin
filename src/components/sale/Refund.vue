<template>
  <div>
    <b-card title="Refund"
            img-top
            tag="article">
      <p class="card-text">
        구매자에게 이더를 환불하고 구매목록에서 제거합니다.
      </p>
      <b-input-group>
        <b-form-input id="receiptId"
                      v-model.trim="receiptId"
                      type="number"
                      :state="receiptIdState"
                      placeholder="Receipt ID"></b-form-input>
        <b-form-input id="productAddress"
                      v-model.trim="productAddress"
                      type="text"
                      :state="productAddressState"
                      placeholder="Product Address"></b-form-input>
        <b-form-input id="buyerAddress"
                      v-model.trim="buyerAddress"
                      type="text"
                      :state="buyerAddressState"
                      placeholder="Buyer Address"></b-form-input>
        <b-form-input id="refundAmount"
                      v-model.trim="refundAmount"
                      type="number"
                      :state="refundAmountState"
                      placeholder="Refund Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!receiptIdState || !productAddressState || !buyerAddressState || !refundAmountState"
                 v-on:click="transfer()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank" v-bind:href="getEtherscanURL('/tx/' + transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js';

  export default {
    name: 'SaleRefund',
    computed: {
      receiptIdState() {
        return this.receiptId && this.receiptId > 0 ? true : false
      },
      productAddressState() {
        return this.productAddress && this.productAddress.length > 0 ? true : false
      },
      buyerAddressState() {
        return this.buyerAddress && this.buyerAddress.length > 0 ? true : false
      },
      refundAmountState() {
        return this.refundAmount && this.refundAmount > 0 ? true : false
      }
    },
    props: ['contract'],
    data() {
      return {
        receiptId: null,
        productAddress: null,
        buyerAddress: null,
        refundAmount: null,
        transactionHash: null,
      }
    },
    methods: {
      transfer() {
        this.$EventBus.$emit('showProgressModal');
        let etherAmount = new BigNumber(this.refundAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
        this.contract.methods.refund(this.receiptId, this.productAddress, this.buyerAddress).send({ value: etherAmount })
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
