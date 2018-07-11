<template>
  <div>
    <TokenInfo class="component"/>
    <GetAllReceipt class="component"/>
    <AddOwner class="component"/>
    <SetCriterionTime class="component"/>
    <ReleaseByCount class="component"/>
    <AddPurchased class="component"/>
    <WithdrawToken class="component"/>
  </div>
</template>

<script>
  import TokenInfo from './TokenInfo'
  import GetAllReceipt from './GetAllReceipt'
  import AddOwner from './AddOwner'
  import SetCriterionTime from './SetCriterionTime'
  import ReleaseByCount from './ReleaseByCount'
  import AddPurchased from './AddPurchased'
  import WithdrawToken from './WithdrawToken'

  export default {
    name: 'TokenDistributor',
    components: {TokenInfo, GetAllReceipt, AddOwner, SetCriterionTime, ReleaseByCount, AddPurchased, WithdrawToken}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
