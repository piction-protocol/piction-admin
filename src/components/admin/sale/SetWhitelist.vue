<template>
  <div>
    <b-card title="SetWhitelist"
            img-top
            tag="article">
      <p class="card-text">
        Whitelist의 주소를 변경합니다.
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
                 v-on:click="setWhitelist()">실행
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
    name: 'SaleSetWhitelist',
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
      getWhitelistAddress() {
        this.currentAddress = this.contract.methods.whiteList().call((err, receipt) => {
          this.currentAddress = receipt;
        });
      },
      setWhitelist() {
        this.progress = true;
        this.contract.methods.setWhitelist(this.address).send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.progress = false;
            this.getWhitelistAddress();
          })
          .on('error', (err) => {
            this.progress = false;
            alert(err);
          });
      }
    },
    created() {
      this.getWhitelistAddress();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
