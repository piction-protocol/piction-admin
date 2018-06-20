<template>
  <div class="navi" v-if="isAdmin">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Admin</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link active-class="active" class="nav-link" to="/admin/pxl">PXL</router-link>
          <router-link active-class="active" class="nav-link" to="/admin/whitelist">WhiteList</router-link>
          <router-link active-class="active" class="nav-link" to="/admin/sale">Sale</router-link>
          <router-link active-class="active" class="nav-link" to="/admin/setting">Setting</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'Navi',
    data() {
      return {
        isAdmin: this.$router.currentRoute.name != 'Wallet',
      }
    },
    watch: {
      '$route'(to, from) {
        this.isAdmin = this.$router.currentRoute.name != 'Wallet';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navi {
    margin-bottom: 20px;
  }
</style>
