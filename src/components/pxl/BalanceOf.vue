<template>
  <div>
    <b-card title="BalanceOf"
            img-top
            tag="article">
      <p class="card-text">
        보유중인 PXL 토큰을 조회합니다.
      </p>
      <b-input-group>
        <b-form-input id="address"
                      v-model.trim="address"
                      type="text"
                      :state="addressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!addressState"
                 v-on:click="balanceOf()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <div v-if="amount">balanceOf : {{amount}} PXL</div>
    </b-card>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js';

  export default {
    name: 'PXLBalanceOf',
    computed: {
      addressState() {
        return this.address && this.address.length > 0 ? true : false
      },
    },
    props: ['contract'],
    data() {
      return {
        address: null,
        amount: null,
      }
    },
    methods: {
      balanceOf() {
        this.contract.methods.balanceOf(this.address).call((err, receipt) => {
          this.amount = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
