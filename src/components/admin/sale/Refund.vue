<template>
  <div>
    <b-card title="Refund"
            img-top
            tag="article">
      <p class="card-text">
        구매자 목록에서 환불이 끝난 주소를 제거하고 판매된 금액에서 차감합니다.(환불은 수동으로 해야함)
      </p>
      <b-input-group>
        <b-form-input id="product"
                      v-model.trim="product"
                      type="text"
                      :state="productState"
                      placeholder="Product Name"></b-form-input>
        <b-form-input id="address"
                      v-model.trim="address"
                      type="text"
                      :state="addressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!productState || !addressState || progress"
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
    name: 'SaleRefund',
    computed: {
      productState() {
        return this.product && this.product.length > 0 ? true : false
      },
      addressState() {
        return this.address && this.address.length > 0 ? true : false
      }
    },
    props: ['contract'],
    data() {
      return {
        product: null,
        address: null,
        progress: false,
        transactionHash: null,
      }
    },
    methods: {
      transfer() {
        this.progress = true;
        this.contract.methods.refund(this.product, this.address).send()
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
