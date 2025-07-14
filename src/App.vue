
<template>
  <div>
    <notifications position="top center" />
    <vue3-confirm-dialog></vue3-confirm-dialog>
    <Menu></Menu>
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
  components: {Menu},
  name: 'App',
};
</script>

<style>
  @import './assets/css/bootstrap.min.css';
  @import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
</style>
