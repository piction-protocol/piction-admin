<template>
  <div>
    <p>검색<input v-model='searchAddress'></p>
    <ul>
      <li v-for='(whitelist, index) in filterWhitelists(whitelists)'>
        {{ whitelist }}
        <button v-on:click='deleteWhitelist(index)'>삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'WhitelistList',
    data() {
      return {
        whitelists: [],
        searchAddress: ''
      }
    },
    methods: {
      getEventWhitelist() {
        this.$parent.contract.getPastEvents('WhitelistedAddressAdded', {
          fromBlock: 0,
          toBlock: 'latest'
        }, (error, events) => {
          var addedAddresses = [];
          events.forEach(obj => {
            var address = obj.returnValues[0];
            this.$parent.contract.methods.whitelist(address).call((err, result) => {
              if (result) {
                addedAddresses.push(address);
                this.whitelists = Array.from(new Set(addedAddresses));
              }
            })
          })
        })
      },
      deleteWhitelist(index) {
        var address = this.whitelists[index];

        this.$parent.contract.methods.removeAddressFromWhitelist(address).send()
        .on('transactionHash', (hash) => {
          console.log('transactionHash: ' + hash);
        })
        .on('receipt', (receipt) => {
          console.log(receipt);
          this.getEventWhitelist();
        })
        .on('confirmation', (confirmationNumber, receipt) => {
        })
        .on('error', (error) => {
          console.log(error);
        });
      },
      filterWhitelists(addresses) {
        if (this.searchAddress.length !== 0) {
          var lowerCaseAddress = String(this.searchAddress).toLowerCase();
          return this.whitelists.filter(e => String(e).toLowerCase().includes(lowerCaseAddress));
        } else {
          return this.whitelists;
        }
      }
    },
    created() {
      this.getEventWhitelist();
      this.$EventBus.$on('refreshWhitelist', () => this.getEventWhitelist());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
