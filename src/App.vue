<template>
  <div id="app">
    <Navi/>
    <Provider/>
    <router-view class="container"/>
    <ProgressModal/>
  </div>
</template>

<script>
  import Navi from './components/Navi'
  import Provider from './components/Provider'
  import ProgressModal from './components/ProgressModal'

  export default {
    name: 'App',
    components: {Navi, Provider, ProgressModal}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
  }

  .container {
    margin: 12px auto 70px auto;
  }
</style>
