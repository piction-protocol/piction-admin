<template>
  <div>
    <b-card title="Transfer"
            img-top
            tag="article">
      <p class="card-text">
        PXL 토큰을 전송합니다.
      </p>
      <b-input-group>
        <b-form-input id="address"
                      v-model.trim="address"
                      type="text"
                      :state="addressState"
                      placeholder="Address"></b-form-input>
        <b-form-input id="amount"
                      v-model.trim="amount"
                      type="text"
                      :state="amountState"
                      placeholder="Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!addressState || !amountState"
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
  export default {
    name: 'PXLTransfer',
    computed: {
      addressState() {
        return this.address && this.address.length > 0 ? true : false
      },
      amountState() {
        return parseInt(this.amount) > 0 ? true : false
      }
    },
    data() {
      return {
        address: null,
        amount: null,
        transactionHash: null,
      }
    },
    methods: {
      async transfer() {
        const totalSupply = await this.$contract.pxl.totalSupply()

        if (this.amount > totalSupply) {
          alert('현재 Token보다 입력된 값이 많습니다.');
          return;
        }

        this.$EventBus.$emit('showProgressModal');
        this.$contract.pxl.transfer(this.address, this.amount)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.transactionHash = receipt.transactionHash;
            this.$EventBus.$emit('hideProgressModal');
            this.$EventBus.$emit('setTotalSupply');
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
