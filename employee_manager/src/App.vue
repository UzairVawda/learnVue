<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
      <router-view  />
    </div>
  </div>
</template>

<script>
import Navbar from './views/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
};
</script>
