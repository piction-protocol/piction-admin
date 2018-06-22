<template>
  <div>
    <b-card title="BuyerAddressTransfer"
            img-top
            tag="article">
      <p class="card-text">
        구매자의 토큰 받을 주소를 변경합니다. (변경될 주소를 미리 Whitelist에 등록해야 합니다.)
      </p>
      <b-input-group>
        <b-form-input id="productAddress"
                      v-model.trim="productAddress"
                      type="text"
                      :state="productAddressState"
                      placeholder="Product Address"></b-form-input>
        <b-form-input id="fromAddress"
                      v-model.trim="fromAddress"
                      type="text"
                      :state="fromAddressState"
                      placeholder="Address"></b-form-input>
        <b-form-input id="toAddress"
                      v-model.trim="toAddress"
                      type="text"
                      :state="toAddressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!productAddressState || !fromAddressState || !toAddressState"
                 v-on:click="transfer()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank" v-bind:href="getEtherscanURL(transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js';

  export default {
    name: 'SaleBuyerAddressTransfer',
    computed: {
      productAddressState() {
        return this.productAddress && this.productAddress.length > 0 ? true : false
      },
      fromAddressState() {
        return this.fromAddress && this.fromAddress.length > 0 ? true : false
      },
      toAddressState() {
        return this.toAddress && this.toAddress.length > 0 ? true : false
      }
    },
    props: ['contract'],
    data() {
      return {
        productAddress: null,
        fromAddress: null,
        toAddress: null,
        transactionHash: null,
      }
    },
    methods: {
      transfer() {
        this.$EventBus.$emit('showProgressModal');
        console.log('productAddress: ' + this.productAddress)
        console.log('from: ' + this.fromAddress)
        console.log('to: ' + this.toAddress)
        this.contract.methods.buyerAddressTransfer(this.productAddress, this.fromAddress, this.toAddress).send()
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
