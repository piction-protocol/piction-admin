<template>
  <div>
    <b-card v-bind:title="title"
            img-top
            align="left"
            tag="article">
      <b-input-group>
        <b-form-input id="address"
                      v-model.trim="address"
                      type="text"
                      :state="addressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!addressState"
                 v-on:click="save()">저장
          </b-btn>
          <b-btn variant="danger"
                 :disabled="!addressState"
                 v-on:click="reset()">초기화
          </b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'SettingSetAddress',
    props: ['title', 'storageKey'],
    computed: {
      addressState() {
        return this.address && this.address.length > 0 ? true : false
      }
    },
    data() {
      return {
        address: localStorage.getItem(this.storageKey),
      }
    },
    methods: {
      save() {
        if(confirm(this.title + '를 저장합니다.')) {
          localStorage.setItem(this.storageKey, this.address);
          alert('저장되었습니다')
        }
      },
      reset() {
        if(confirm(this.title + '를 초기화합니다.')) {
          this.address = null;
          localStorage.setItem(this.storageKey, null);
          alert('초기화되었습니다')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
