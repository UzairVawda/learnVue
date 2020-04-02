<template>
  <div id="editEmployee">
    <div class="row">
      <h3>Edit Employee</h3>
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="firstName" type="text" class="validate" v-model="firstName">
          </div>
          <div class="input-field col s6">
            <input id="lastName" type="text" class="validate" v-model="lastName">
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="employee_id" type="text" class="validate" v-model="employee_id" disabled>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="dept" type="text" class="validate" v-model="dept">
          </div>
          <div class="input-field col s6">
            <input id="position" type="text" class="validate" v-model="position">
          </div>
        </div>
        <!-- <div class="row"> -->
          <!-- <div class="col s2"> -->
            <button type="submit" class="btn green darken-1 waves-effect"> Submit </button>
          <!-- </div> -->
          <!-- <div class="col s1"> -->
            <router-link to="/" class="btn grey darken-2 waves-effect"> Back </router-link>
          <!-- </div> -->
        <!-- </div> -->
      </form>
    </div>
  </div>
</template>

<script>
import db from '../components/firebaseInit';

export default {
  name: 'editEmployee',
  data() {
    return {
      employee_id: null,
      firstName: null,
      lastName: null,
      dept: null,
      position: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    db.firestore().collection('employees').where('employee_id', '==', to.params.employee_id).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            /* eslint-disable no-param-reassign */
            vm.employee_id = doc.data().employee_id;
            vm.firstName = doc.data().name.split(' ')[0].charAt(0).toUpperCase()
                         + doc.data().name.split(' ')[0].slice(1);
            vm.lastName = doc.data().name.split(' ')[1].charAt(0).toUpperCase()
                         + doc.data().name.split(' ')[1].slice(1);
            vm.dept = doc.data().dept.charAt(0).toUpperCase() + doc.data().dept.slice(1);
            vm.position = doc.data().position.charAt(0).toUpperCase()
                        + doc.data().position.slice(1);
            /* eslint-enable no-param-reassign */
          });
        });
      });
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      db.firestore().collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.employee_id = doc.data().employee_id;
            /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
            this.firstName = doc.data().name.split(' ')[0];
            this.lastName = doc.data().name.split(' ')[1];
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    updateEmployee() {
      // FIX BELOW ERROR
      /* eslint-disable-next-line */
      if (window.confirm('Are you sure you want to update?')) {
        db.firestore().collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                employee_id: this.employee_id,
                name: `${this.firstName.charAt(0).toUpperCase()}${this.firstName.slice(1)} ${this.lastName.charAt(0).toUpperCase()}${this.lastName.slice(1)}`,
                dept: this.dept.charAt(0).toUpperCase() + this.dept.slice(1),
                position: this.position.charAt(0).toUpperCase() + this.position.slice(1),
              }).then(this.$router.push({
                name: 'viewEmployee',
                params: { employee_id: this.$route.params.employee_id },
              }))
                .catch((err) => this.$router.push({
                  name: 'editEmployee',
                  params: { error: err },
                }));
            });
          });
      }
    },
  },
};
</script>
