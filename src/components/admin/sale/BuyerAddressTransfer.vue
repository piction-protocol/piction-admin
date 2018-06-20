<template>
  <div>
    <b-card title="BuyerAddressTransfer"
            img-top
            tag="article">
      <p class="card-text">
        구매자의 토큰 받을 주소를 변경합니다. (변경될 주소를 미리 Whitelist에 등록해야 합니다.)
      </p>
      <b-input-group>
        <b-form-input id="product"
                      v-model.trim="product"
                      type="text"
                      :state="productState"
                      placeholder="Product Name"></b-form-input>
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
                 :disabled="!productState || !fromAddressState || !toAddressState || progress"
                 v-on:click="transfer()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-progress v-if="progress" :value="100" variant="danger" :animated="true"></b-progress>
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
      productState() {
        return this.product && this.product.length > 0 ? true : false
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
        product: null,
        fromAddress: null,
        toAddress: null,
        progress: false,
        transactionHash: null,
      }
    },
    methods: {
      transfer() {
        this.progress = true;
        console.log('product: ' + this.product)
        console.log('from: ' + this.fromAddress)
        console.log('to: ' + this.toAddress)
        this.contract.methods.buyerAddressTransfer(this.product, this.fromAddress, this.toAddress).send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.progress = false;
          })
          .on('error', (err) => {
            this.progress = false;
            alert(err);
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
