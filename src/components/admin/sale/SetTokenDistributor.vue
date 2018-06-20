<template>
  <div>
    <b-card title="SetTokenDistributor"
            img-top
            tag="article">
      <p class="card-text">
        Token Distributor의 주소를 변경합니다.
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
                 :disabled="!addressState || progress"
                 v-on:click="setWallet()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-progress v-if="progress" :value="100" variant="danger" :animated="true"></b-progress>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL(transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'SaleSetTokenDistributor',
    computed: {
      addressState() {
        return this.address && this.address.length > 0 ? true : false
      },
    },
    props: ['contract'],
    data() {
      return {
        currentAddress: null,
        address: null,
        progress: false,
        transactionHash: null,
      }
    },
    methods: {
      getTokenDistributorAddress() {
        this.currentAddress = this.contract.methods.tokenDistributor().call((err, receipt) => {
          this.currentAddress = receipt;
        });
      },
      setWallet() {
        this.progress = true;
        this.contract.methods.setTokenDistributor(this.address).send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.progress = false;
            this.getTokenDistributorAddress();
          })
          .on('error', (err) => {
            this.progress = false;
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
