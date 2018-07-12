<template>
  <div>
    <b-alert show>
      <div>CONTRACT ADDRESS : <a target="_blank" class="alert-link"
                                 v-bind:href="getEtherscanURL('/address/' + contractAddress)">{{contractAddress}}</a>
      </div>
    </b-alert>
    <b-alert v-if="productAddress == 0" show variant="danger" align="left">
      <div>등록된 상품이 없습니다.</div>
    </b-alert>
    <b-list-group v-if="productAddress > 0">
      <b-list-group-item align="left">등록 상품 정보</b-list-group-item>
      <b-list-group-item align="left">
        <div>상품명 : {{ productName }}</div>
        <div>상품 주소 : <a target="_blank" class="alert-link"
                        v-bind:href="getEtherscanURL('/address/' + productAddress)">{{ productAddress }}</a></div>
        <div>최대 모집 금액 : {{ productMaxcap }} ETH</div>
        <div>현재 모집 금액 : {{ productWeiRaised }} ETH</div>
        <div>1인당 한정 금액 : {{ productExceed }} ETH</div>
        <div>구매 최소 금액 : {{ productMinimum }} ETH</div>
        <div>토큰 전환 비율 : {{ productRate }} PXL : 1 ETH</div>
        <div>락업 기간 : {{ productLockup }} 일</div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: 'SaleInfo',
    data() {
      return {
        contractAddress: null,
        productAddress: null,
        productName: '',
        productMaxcap: 0,
        productWeiRaised: 0,
        productExceed: 0,
        productMinimum: 0,
        productRate: 0,
        productLockup: ''
      }
    },
    methods: {
      getSaleAddress() {
        this.contractAddress = localStorage.getItem(this.localStorageKey.saleAddress);
      },
      async getProductAddress() {
        this.productAddress = await this.$contract.sale.getProductAddress()
      },
      async getProductName() {
        this.productName = await this.$contract.product.getProductName()
      },
      async getMaxcap() {
        this.productMaxcap = await this.$contract.product.getMaxcap()
      },
      async getWeiRaised() {
        this.productWeiRaised = await this.$contract.sale.getProductWeiRaised(this.productAddress)
      },
      async getExceed() {
        this.productExceed = await this.$contract.product.getExceed()
      },
      async getMinimum() {
        this.productMinimum = await this.$contract.product.getMinimum()
      },
      async getRate() {
        this.productRate = await this.$contract.product.getRate()
      },
      async getLockup() {
        this.productLockup = await this.$contract.product.getLockup()
      }
    },
    watch: {
      productAddress() {
        this.getProductName();
        this.getMaxcap();
        this.getWeiRaised();
        this.getExceed();
        this.getMinimum();
        this.getRate();
        this.getLockup();
      }
    },
    created() {
      this.getSaleAddress();
      this.getProductAddress();
      this.$EventBus.$on('changedProduct', () => this.getProductAddress());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
