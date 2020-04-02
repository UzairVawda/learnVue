<template>
  <div id="register">
    <div class="row">
      <h3 class="col s12 m8 offset-m2">Login</h3>
      <div class="col s12 m8 offset-m2">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input type="text" id="email" class="email" v-model="email">
            <label for="email">Email</label>
          </div>
        </div>
      </div>
      <div class="col s12 m8 offset-m2">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input type="password" id="password" class="password" v-model="password">
            <label for="password">Password</label>
          </div>
        </div>
      </div>
      <div class="col s12 m8 offset-m5">
        <!-- eslint-disable-next-line max-len -->
        <button v-on:click="login" class="btn waves-effect deep-orange darken-2 black-text">Sigin</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../components/firebaseInit';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login(e) {
      db
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
          // eslint-disable-next-line no-alert
            alert(`You are logged in as ${this.email}`);
            this.$router.go({ path: this.$router.path });
          },
          (err) => {
            // eslint-disable-next-line no-alert
            alert(err.message);
          },
        );
      e.preventDefault();
    },
  },
};
</script>
