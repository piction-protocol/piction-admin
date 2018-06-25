<template>
  <div>
    <GetAllReceipt class="component" :contract="distributorContract"/>
    <AddOwner class="component" :contract="distributorContract"/>
    <SetCriterionTime class="component" :contract="distributorContract"/>
    <ReleaseByCount class="component" :contract="distributorContract"/>
    <AddPurchased class="component" :contract="distributorContract"/>
  </div>
</template>

<script>
  import Web3 from 'web3';
  import saleAbi from './../../assets/abi/Sale.json';
  import distributorAbi from './../../assets/abi/TokenDistributor.json'
  import GetAllReceipt from './GetAllReceipt'
  import AddOwner from './AddOwner'
  import SetCriterionTime from './SetCriterionTime'
  import ReleaseByCount from './ReleaseByCount'
  import AddPurchased from './AddPurchased'

  export default {
    name: 'TokenDistributor',
    components: {GetAllReceipt, AddOwner, SetCriterionTime, ReleaseByCount, AddPurchased},
    data() {
      return {
        saleContract: null,
        distributorContract: null
      }
    },
    created() {
      web3 = new Web3(web3.currentProvider);
      this.saleContract = new web3.eth.Contract(saleAbi, localStorage.getItem(this.localStorageKey.saleAddress));
      this.saleContract.methods.tokenDistributor().call((err, distributorAddress) => {
        web3.eth.getAccounts((err, account) => {
          this.distributorContract = new web3.eth.Contract(distributorAbi, distributorAddress);
          this.saleContract.options.from = account[0];
          this.distributorContract.options.from = account[0];
        });
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
