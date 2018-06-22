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
        </b-row>
        <b-row>
          <b-col md="12" class="my-1">
            <b-table show-empty
                    responsive
                    :items="items"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    @filtered="onFiltered">
              <template slot="amount" slot-scope="row">
                {{ row.value }} PXL
              </template>
              <template slot="etherAmount" slot-scope="row">
                {{ row.value }} ETH
              </template>
              <template slot="release" slot-scope="row">
                <b-btn size="sm" text="Button" variant="danger" :disabled="releaseDisableState(row.item, row.index)"
                       v-on:click='release(row.item)'>{{ row.item.release ? "Released" : "Release" }}
                </b-btn>
              </template>
              <template slot="refund" slot-scope="row">
                <b-btn size="sm" text="Button" variant="danger" :disabled="refundDisableState(row.item, row.index)"
                       v-on:click='refund(row.item)'>{{ row.item.refund ? "Refunded" : "Refund" }}
                </b-btn>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js';

  export default {
    name: 'DistributorGetAllReceipt',
    props: ['contract'],
    data() {
      return {
        fields: [
          { key: 'id', label: 'ID' },
          { key: 'product', label: 'Product' },
          { key: 'buyer', label: 'Buyer' },
          { key: 'amount', label: 'Amount' },
          { key: 'etherAmount', label: 'EtherAmount' },
          { key: 'release', label: 'Release' },
          { key: 'refund', label: 'Refund' },
        ],
        items: [],
        currentPage: 1,
        perPage: 10,
        totalRows: this.items && this.items.length > 0 ? this.items.length : 0,
        filter: null,
        transactionHash: null,
      }
    },
    methods: {
      releaseDisableState(item, index) {
        return this.items[index].refund || item.release
      },
      refundDisableState(item, index) {
        return this.items[index].release || item.refund
      },
      getAllReceipt() {
        const FIELD_PRODUCT  = 0
        const FIELD_BUYER = 1
        const FIELD_ID = 2
        const FIELD_AMOUNT = 3
        const FIELD_ETHERAMOUNT = 4
        const FIELD_RELEASE = 5
        const FIELD_REFUND = 6

        this.items = [];

        this.contract.methods.getAllReceipt().call((err, receiptData) => {
          var numReceipt = receiptData[0].length;
          for (let i = 0; i < numReceipt; i++) {
            const receipt = {
              id: receiptData[FIELD_ID][i],
              product: receiptData[FIELD_PRODUCT][i],
              buyer: receiptData[FIELD_BUYER][i],
              amount: new BigNumber(receiptData[FIELD_AMOUNT][i]).div(new BigNumber(Math.pow(10, 18))).toNumber(),
              etherAmount: new BigNumber(receiptData[FIELD_ETHERAMOUNT][i]).div(new BigNumber(Math.pow(10, 18))).toNumber(),
              release: receiptData[FIELD_RELEASE][i],
              refund: receiptData[FIELD_REFUND][i]
            }
            this.items.push(receipt)
          }
        });
      },
      release(item) {
        var index = this.items.findIndex(p => p.id == item.id)
        this.$EventBus.$emit('showProgressModal');
        this.contract.methods.getId(this.items[index].buyer, this.items[index].product).call((err, id) => {
          if (id != this.items[index].id) {
            alert('error')
            this.$EventBus.$emit('hideProgressModal');
            return;
          } else {
            if (this.items[index].release) {
              alert('Error: This receipt was already released!')
              return;
            }
            this.$EventBus.$emit('showProgressModal');
            this.contract.methods.release(index).send()
            .on('transactionHash', (hash) => {
              this.transactionHash = hash;
            })
            .on('receipt', (receipt) => {
              this.$EventBus.$emit('hideProgressModal');
              this.getAllReceipt();
            })
            .on('error', (err) => {
              this.$EventBus.$emit('hideProgressModal');
              alert(err);
            });
          }
        });
      },
      refund(item) {
        var index = this.items.findIndex(p => p.id == item.id)
        this.$EventBus.$emit('showProgressModal');
        this.contract.methods.getId(this.items[index].buyer, this.items[index].product).call((err, id) => {
          if (id != this.items[index].id) {
            alert('error')
            this.$EventBus.$emit('hideProgressModal');
            return;
          } else {
            if (this.items[index].refund) {
              alert('Error: This receipt was already refunded!')
              return;
            }
            this.$EventBus.$emit('showProgressModal');
            this.contract.methods.refund(index).send()
            .on('transactionHash', (hash) => {
              this.transactionHash = hash;
            })
            .on('receipt', (receipt) => {
              this.$EventBus.$emit('hideProgressModal');
              this.getAllReceipt();
            })
            .on('error', (err) => {
              this.$EventBus.$emit('hideProgressModal');
              alert(err);
            });
          }
        });
      },
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    watch: {
      contract() {
        this.getAllReceipt();
      }
    },
    created() {
      this.$EventBus.$on('updateReceipt', () => this.getAllReceipt());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
