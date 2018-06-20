<template>
  <div>
    <b-card title="setState"
            img-top
            tag="article">
      <p class="card-text">
        현재 상태를 변경합니다.
      </p>
      <div>현재 상태: {{ state }}</div>
      <div>
        <input type="radio" id="Preparing" value="Preparing" v-model="picked" disabled>
        <label for="one">Preparing</label>
        <br>
        <input type="radio" id="Starting" value="Starting" v-model="picked" :disabled="state == 'Starting'">
        <label for="two">Starting</label>
        <br>
        <input type="radio" id="Pausing" value="Pausing" v-model="picked" :disabled="state == 'Pausing'">
        <label for="three">Pausing</label>
        <br>
        <input type="radio" id="Finished" value="Finished" v-model="picked" :disabled="state == 'Finished'">
        <label for="four">Finished</label>
        <br>
        <b-btn variant="info"
               :disabled="!pickedState || progress"
               v-on:click="changeState">변경
        </b-btn>
        <b-progress v-if="progress" :value="100" variant="danger" :animated="true"></b-progress>
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
        state: null,
        picked: null,
        progress: false
      }
    },
    methods: {
      getState() {
        this.contract.methods.getState().call((err, receipt) => {
          this.contract.methods.getKeyByValue(receipt).call((err, state) => {
              this.state = state
              this.picked = state
          });
        });
      },
      changeState() {
        this.progress = true;
        switch (this.picked) {
        case "Starting":
          console.log("Starting")
          this.contract.methods.start().send()
          .on('transactionHash', (hash) => {
            console.log('transactionHash: ' + hash);
          })
          .on('receipt', (receipt) => {
            this.progress = false;
            this.getState();
          })
          .on('error', (error) => {
            this.progress = false;
            alert(err);
          });
          break;
        case "Pausing":
        console.log("Pausing")
          this.contract.methods.pause().send()
          .on('transactionHash', (hash) => {
            console.log('transactionHash: ' + hash);
          })
          .on('receipt', (receipt) => {
            this.progress = false;
            this.getState();
          })
          .on('error', (error) => {
            this.progress = false;
            alert(err);
          });
          break;
        case "Finished":
          this.contract.methods.finish().send()
          .on('transactionHash', (hash) => {
            console.log('transactionHash: ' + hash);
          })
          .on('receipt', (receipt) => {
            this.progress = false;
            this.getState();
          })
          .on('error', (error) => {
            this.progress = false;
            alert(err);
          });
          break;
        default:
          this.progress = false;
          alert('choice state')
          break;
        }
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
