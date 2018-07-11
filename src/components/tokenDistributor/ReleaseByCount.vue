<template>
  <div>
    <b-card title="ReleaseByCount"
            img-top
            tag="article">
      <p class="card-text">
        갯수별로 Release 합니다. (최대 30개)
      </p>
      <b-input-group>
        <b-form-input id="productAddress"
                      v-model.trim="productAddress"
                      type="text"
                      :state="productAddressState"
                      placeholder="Product Address"></b-form-input>
        <b-form-input id="releaseCount"
                      v-model.trim="releaseCount"
                      type="number"
                      :state="releaseCountState"
                      placeholder="Count"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!productAddressState || !releaseCountState"
                 v-on:click="releaseByCount()">실행
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
    name: 'DistributorReleaseByCount',
    computed: {
      productAddressState() {
        return this.productAddress && this.productAddress.length > 0 ? true : false
      },
      releaseCountState() {
        return this.releaseCount && this.releaseCount > 0 ? true : false
      }
    },
    data() {
      return {
        productAddress: null,
        releaseCount: null,
        transactionHash: null,
      }
    },
    methods: {
      async releaseByCount() {
        const tokenDistributorAddress = await this.$contract.sale.getTokenDistributorAddress();
        const tokenBalance = await this.$contract.pxl.balanceOf(tokenDistributorAddress)

        if (tokenBalance == 0) {
          alert('TokenDistributor에 Token이 없습니다');
          return;
        }

        if (this.releaseCount > 30) {
          alert('Release 갯수를 30이하로 입력해주세요');
          return;
        }

        this.$EventBus.$emit('showProgressModal');
        this.$contract.tokenDistributor.releaseByCount(this.productAddress, this.releaseCount).send()
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.$EventBus.$emit('updateReceipt');
            this.$EventBus.$emit('updateTokenInfo');
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
