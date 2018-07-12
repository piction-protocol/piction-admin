<template>
  <div>
    <b-input-group size="lg" class="search">
      <b-form-input v-model="searchAddress" placeholder="Search Address"></b-form-input>
    </b-input-group>
    <div class="sum"> 총 {{ whitelists.length }}개</div>
    <ul>
      <li v-for='(whitelist, index) in filterWhitelists(whitelists)'>
        <b-input-group class="whitelist mb-3" size="sm">
          <div class="form-control">
            <a target="_blank" class="alert-link"
               v-bind:href="getEtherscanURL('/address/' + whitelist)">{{whitelist}}</a>
          </div>
          <b-input-group-append>
            <b-btn size="sm" text="Button" variant="danger"
                   v-on:click='deleteWhitelist(index)'>삭제
            </b-btn>
          </b-input-group-append>
        </b-input-group>
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
      async getEventWhitelist() {
        this.whitelists = await this.$contract.whitelist.getWhitelist()
      },
      deleteWhitelist(index) {
        this.$EventBus.$emit('showProgressModal');
        let address = this.whitelists[index];
        this.$contract.whitelist.removeAddressFromWhitelist(address)
          .on('transactionHash', (hash) => {
            this.$EventBus.$emit('SetMessageProgressModal', hash);
          })
          .on('receipt', (receipt) => {
            this.getEventWhitelist();
            this.$EventBus.$emit('hideProgressModal');
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
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
  ul {
    list-style: none;
    padding: 0;
  }

  .search {
    margin-bottom: 10px;
  }

  .whitelist {
    margin-bottom: 5px !important;
  }

  .sum {
    margin-bottom: 5px !important;
  }
</style>
