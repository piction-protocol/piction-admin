<template>
  <div>
    <SetAddress v-for="address in addressList()"
                class="component"
                :key="address.storageKey"
                :title="address.title"
                :storageKey="address.storageKey"/>
  </div>
</template>

<script>
  import SetAddress from './SetAddress'

  export default {
    name: 'Setting',
    components: {SetAddress},
    data() {
      return {
        addressList: function () {
          return [
            {title: 'PXL Contract address', storageKey: this.localStorageKey.PXLAddress},
            {title: 'Whitelist Contract address', storageKey: this.localStorageKey.whitelistAddress},
            {title: 'Sale Contract address', storageKey: this.localStorageKey.saleAddress},
          ]
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component {
    margin-bottom: 10px;
  }
</style>
