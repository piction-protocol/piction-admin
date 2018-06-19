<template>
  <div class="navi">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Admin</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
            <router-link active-class="active" class="nav-link" to="/admin">PXL</router-link>
            <router-link active-class="active" class="nav-link" to="/admin/whitelist">WhiteList</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'Navi',
    computed: {},
    data() {
      return {}
    },
    methods: {},
    created() {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navi {
    margin-bottom: 20px;
  }
</style>
