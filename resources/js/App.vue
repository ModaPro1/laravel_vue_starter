<template>
  <base-navbar/>
  <router-view></router-view>
</template>

<style>
  @import 'bootstrap/dist/css/bootstrap.css';
</style>

<script>
import BaseNavbar from '@/components/BaseNavbar.vue';

export default {
  components: {
    BaseNavbar
  }
}
</script>