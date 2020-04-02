<template>
<!--  eslint-disable max-len -->
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper light-blue darken-3">
        <div class="container">
          <router-link class="brand-logo" to="/">Employee Tracker</router-link>
        </div>
        <ul class="right">
          <li  v-if="isLoggedIn" style="padding-right:10px;">{{ currentUser }}</li>
          <li  v-if="isLoggedIn" class="waves-effect"><router-link to="/">Dashboard</router-link></li>
          <li  v-if="!isLoggedIn" class="waves-effect"><router-link to="/login">Login</router-link></li>
          <li  v-if="!isLoggedIn" class="waves-effect"><router-link to="/register">Register</router-link></li>
          <li v-if="isLoggedIn" ><button v-on:click="logout" class="btn flat wave-effect">Logout</button></li>
        </ul>
      </div>
    </nav>
   </div>
</template>

<script>
import db from '../components/firebaseInit';

export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    };
  },
  created() {
    if (db.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = db.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      db.auth().signOut().then(() => {
        this.$router.go({
          path: this.$router.path,
        });
      });
    },
  },
};
</script>
