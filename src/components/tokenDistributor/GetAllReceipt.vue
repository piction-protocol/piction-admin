<template>
  <div>
    <b-card title="Receipt"
            img-top
            tag="article">
      <b-container fluid>
        <b-row>
          <b-col md="6" class="my-1">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Search" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col md="6" class="needToken">
            <p> 배포 시 필요한 토큰 {{ getSendToken }} </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="receiptTable">
            <b-table show-empty
                     responsive
                     small
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    :sort-by.sync="sortBy"
                    @filtered="onFiltered">
              <template slot="product" slot-scope="row">
                <a target="_blank" v-bind:href="getEtherscanURL('/address/' + row.value)">{{row.value}}</a>
              </template>
              <template slot="buyer" slot-scope="row">
                <a target="_blank" v-bind:href="getEtherscanURL('/address/' + row.value)">{{row.value}}</a>
              </template>
              <template slot="amount" slot-scope="row">
                {{ row.value }}
              </template>
              <template slot="ether" slot-scope="row">
                {{ row.value }}
              </template>
              <template slot="action" slot-scope="row">
                <b-btn class="release-button" size="sm" text="Button" variant="danger" :disabled="actionDisableState(row.item)"
                       v-on:click='release(row.item)'>{{ row.item.action == "released" ? "Released" : row.item.action == "refunded" ? "Refunded" : "Release" }}
                </b-btn>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Per page" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'DistributorGetAllReceipt',
    computed: {
      getSendToken() {
        var sendToken = 0;
        this.items.forEach(e => {
          if (e.action == "none") {
            sendToken += e.amount;
          }
        });
        if (sendToken == 0) {
          return "없음"
        } else {
          return " : " + sendToken + " PXL"
        }
      }
    },
    data() {
      return {
        fields: [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'product', label: 'Product Address', sortable: true },
          { key: 'buyer', label: 'Buyer Address', sortable: true },
          { key: 'amount', label: 'PXL', sortable: true, 'class': 'text-right' },
          { key: 'ether', label: 'ETH', sortable: true, 'class': 'text-right' },
          { key: 'action', label: 'Action', sortable: true, 'class': 'text-right' }
        ],
        items: [],
        currentPage: 1,
        perPage: 10,
        pageOptions: [ 5, 10, 15, 20 ],
        totalRows: this.items && this.items.length > 0 ? this.items.length : 0,
        filter: null,
        sortBy: 'id',
        transactionHash: null,
      }
    },
    methods: {
      actionDisableState(item) {
        return item.action == "released" || item.action == "refunded"
      },
      async getAllReceipt() {
        this.items = await this.$contract.tokenDistributor.getAllReceipt()
      },
      async release(item) {
        const tokenDistributorAddress = await this.$contract.sale.getTokenDistributorAddress();
        const tokenBalance = await this.$contract.pxl.balanceOf(tokenDistributorAddress)

        if (tokenBalance == 0) {
          alert('TokenDistributor에 Token이 없습니다');
          return;
        }

        if (tokenBalance < item.amount) {
          alert('배포할 Token이 현재 가지고 있는 Token보다 적습니다');
          return;
        }

        var index = this.items.findIndex(p => p.id == item.id);
        var contractIndex = index + 1;

        this.$EventBus.$emit('showProgressModal');
        this.$contract.tokenDistributor.release(contractIndex)
        .on('transactionHash', (hash) => {
          this.$EventBus.$emit('SetMessageProgressModal', hash);
          this.transactionHash = hash;
        })
        .on('receipt', (receipt) => {
          this.$EventBus.$emit('hideProgressModal');
          this.$EventBus.$emit('updateTokenInfo');
          this.getAllReceipt();
        })
        .on('error', (err) => {
          this.$EventBus.$emit('hideProgressModal');
          alert(err);
        });
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    created() {
      this.getAllReceipt();
      this.$EventBus.$on('updateReceipt', () => this.getAllReceipt());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .receiptTable >>> td { font-size: 14px; vertical-align: middle; }
  .release-button { font-size: 11px; }
  .needToken { font-size: 17px; vertical-align: middle; text-align: right;}
</style>
