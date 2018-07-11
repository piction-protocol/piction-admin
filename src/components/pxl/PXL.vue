<template>
  <div>
    <ContractInfo class="component"/>
    <Mint class="component"/>
    <Burn class="component"/>
    <BalanceOf class="component"/>
    <Transfer class="component"/>
    <AddOwner class="component"/>
    <Unlock class="component"/>
  </div>
</template>

<script>
  import ContractInfo from './ContractInfo'
  import Mint from './Mint'
  import Burn from './Burn'
  import BalanceOf from './BalanceOf'
  import Transfer from './Transfer'
  import AddOwner from './AddOwner'
  import Unlock from './Unlock'

  export default {
    name: 'PXL',
    components: {ContractInfo, Mint, Burn, BalanceOf, Transfer, AddOwner, Unlock}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component {
    margin-bottom: 10px;
  }
</style>
