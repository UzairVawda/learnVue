<template>
  <div id="register">
    <div class="row">
      <h3 class="col s12 m8 offset-m2">Register</h3>
      <div class="col s12 m8 offset-m2">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input type="email" id="email" class="validate" v-model="email"
                   required="" aria-required="true">
            <label for="email">Email</label>
          </div>
        </div>
      </div>
      <div class="col s12 m8 offset-m2">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input type="password" id="password" class="validate" v-model="password"
                   required="" aria-required="true">
            <label for="password">Password</label>
          </div>
        </div>
      </div>
      <div class="col s12 m8 offset-m2">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input type="password" id="confirmPassword"
                   class="validate" v-model="confirmPassword"
                   required="" aria-required="true">
            <label for="confirmPassword">Confirm Password</label>
          </div>
        </div>
      </div>
      <div class="col s12 m8 offset-m5">
        <button v-on:click="register"
                class="btn waves-effect deep-orange darken-2 black-text">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../components/firebaseInit';

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    register(e) {
      // this.errors = [];
      if (this.password === this.confirmPassword) {
        db.auth().createUserWithEmailAndPassword(this.email, this.password)
          // eslint-disable-next-line no-unused-vars
          .then((user) => {
            this.$router.go({
              path: this.$router.path,
            });
          },
          (error) => {
            // eslint-disable-next-line no-alert
            alert(error.code);
          });
      }
      e.preventDefault();
    },
  },
};
</script>
