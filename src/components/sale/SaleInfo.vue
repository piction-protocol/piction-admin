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
  import BigNumber from 'bignumber.js';
  import productAbi from '../../assets/abi/Product.json'

  export default {
    name: 'SaleInfo',
    props: ['contract'],
    data() {
      return {
        contractAddress: null,
        productAddress: null,
        productContract: null,
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
      getProductAddress() {
        this.contract.methods.product().call((err, productAddress) => {
          this.productAddress = productAddress;
        });
      },
      getProductContract() {
        this.productContract = new web3.eth.Contract(productAbi, this.productAddress);
      },
      getProductName() {
        this.productContract.methods.name().call((err, receipt) => {
          this.productName = receipt;
        });
      },
      getMaxcap() {
        this.productContract.methods.maxcap().call((err, receipt) => {
          this.productMaxcap = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        })
      },
      getWeiRaised() {
        this.contract.methods.getProductWeiRaised(this.productAddress).call((err, receipt) => {
          this.productWeiRaised = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        })
      },
      getExceed() {
        this.productContract.methods.exceed().call((err, receipt) => {
          this.productExceed = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        })
      },
      getMinimum() {
        this.productContract.methods.minimum().call((err, receipt) => {
          this.productMinimum = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        })
      },
      getRate() {
        this.productContract.methods.rate().call((err, receipt) => {
          this.productRate = receipt;
        })
      },
      getLockup() {
        this.productContract.methods.lockup().call((err, receipt) => {
          this.productLockup = receipt;
        })
      }
    },
    watch: {
      productAddress() {
        this.getProductContract();
      },
      productContract() {
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
