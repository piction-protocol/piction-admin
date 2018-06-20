<template>
  <div id="app">
    <Navi/>
    <router-view class="container"/>
  </div>
</template>

<script>
  import Navi from './components/admin/Navi'

  export default {
    name: 'App',
    components: {Navi}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }
  .container {
    margin: 0 auto 70px auto;
    max-width: 720px !important;
  }
</style>
