<template>
  <div v-if="selected > 0">
    <b-card title="SetState"
            img-top
            tag="article">
      <p class="card-text">
        판매 상태를 변경합니다. (현재 상태: {{ selected && options[selected].text }})
      </p>
      <b-input-group>
        <b-form-select v-model="selected">
          <option v-for="option in options"
                  :value="option.value"
                  :disabled="option.disabled">{{option.text}}
          </option>
        </b-form-select>

        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="selected && options[selected].disabled"
                 @click="changeState">변경
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <div v-if="transactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL(transactionHash)">{{transactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'SaleState',
    computed: {
      pickedState() {
        return this.picked != this.state ? true : false
      },
    },
    props: ['contract'],
    data() {
      return {
        transactionHash: null,
        selected: null,
        options: [
          {value: 0, text: 'Unknown', methodName: null},
          {value: 1, text: 'Preparing', methodName: null},
          {value: 2, text: 'Starting', methodName: 'start'},
          {value: 3, text: 'Pausing', methodName: 'pause'},
          {value: 4, text: 'Finished', methodName: 'finish'},
        ]
      }
    },
    methods: {
      getState() {
        this.contract.methods.getState().call((err, stateIndex) => {
          this.options.forEach(option => option.disabled = false);
          this.options[0].disabled = true
          this.options[1].disabled = true
          this.options[stateIndex].disabled = true
          this.selected = stateIndex;
        });
      },
      changeState() {
        this.$EventBus.$emit('showProgressModal');
        eval(`this.contract.methods.${this.options[this.selected].methodName}()`).send()
          .on('transactionHash', (hash) => {
            this.transactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.getState();
            this.$EventBus.$emit('hideProgressModal');
          })
          .on('error', (err) => {
            this.$EventBus.$emit('hideProgressModal');
            alert(err);
          });
      }
    },
    created() {
      this.getState();
      this.$EventBus.$on('changedState', () => this.getState());
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
