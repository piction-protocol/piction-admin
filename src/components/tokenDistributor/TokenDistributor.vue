<template>
  <div>
    <TokenInfo class="component" :contract="distributorContract" :tokenBalance="tokenBalance"/>
    <GetAllReceipt class="component" :contract="distributorContract" :tokenBalance="tokenBalance"/>
    <AddOwner class="component" :contract="distributorContract"/>
    <SetCriterionTime class="component" :contract="distributorContract"/>
    <ReleaseByCount class="component" :contract="distributorContract" :tokenBalance="tokenBalance"/>
    <AddPurchased class="component" :contract="distributorContract"/>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import BigNumber from 'bignumber.js';
  import saleAbi from './../../assets/abi/Sale.json';
  import distributorAbi from './../../assets/abi/TokenDistributor.json'
  import tokenAbi from '../../assets/abi/PXL.json';
  import TokenInfo from './TokenInfo'
  import GetAllReceipt from './GetAllReceipt'
  import AddOwner from './AddOwner'
  import SetCriterionTime from './SetCriterionTime'
  import ReleaseByCount from './ReleaseByCount'
  import AddPurchased from './AddPurchased'

  export default {
    name: 'TokenDistributor',
    components: {TokenInfo, GetAllReceipt, AddOwner, SetCriterionTime, ReleaseByCount, AddPurchased},
    data() {
      return {
        saleContract: null,
        distributorContract: null,
        tokenBalance: null,
      }
    },
    methods: {
      getAccount(distributorAddress) {
        web3.eth.getAccounts((err, accounts) => {
          this.saleContract.options.from = accounts[0];

          this.distributorContract = new web3.eth.Contract(distributorAbi, distributorAddress);
          this.distributorContract.options.from = this.saleContract.options.address;
        });
      },
      getBalanceOf(tokenContract) {
        tokenContract.methods.balanceOf(this.distributorContract.options.address).call((err, receipt) => {
          this.tokenBalance = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        });
      }
    },
    watch: {
      distributorContract() {
        this.distributorContract.methods.getTokenAddress().call((err, tokenAddress) => {
          var tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
          this.getBalanceOf(tokenContract);
        });
      }
    },
    created() {
      web3 = new Web3(web3.currentProvider);
      this.saleContract = new web3.eth.Contract(saleAbi, localStorage.getItem(this.localStorageKey.saleAddress));
      this.saleContract.methods.tokenDistributor().call((err, distributorAddress) => {
        this.getAccount(distributorAddress);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
