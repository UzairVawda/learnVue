<template>
  <div id="newEmployee">
    <div class="row">
      <h3>New Employee</h3>
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="firstName" type="text" class="validate" v-model="firstName">
            <label for="firstName">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="lastName" type="text" class="validate" v-model="lastName">
            <label for="lastName">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="employee_id" type="text" class="validate" v-model="employee_id">
            <label for="employee_id">Employee ID</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="dept" type="text" class="validate" v-model="dept">
            <label for="dept">Department</label>
          </div>
          <div class="input-field col s6">
            <input id="position" type="text" class="validate" v-model="position">
            <label for="position">Position</label>
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
  name: 'newEmployee',
  data() {
    return {
      employee_id: null,
      firstName: null,
      lastName: null,
      dept: null,
      position: null,
    };
  },
  methods: {
    saveEmployee() {
      db.firestore().collection('employees').add({
        employee_id: this.employee_id,
        name: `${this.firstName.charAt(0).toUpperCase()}${this.firstName.slice(1)} ${this.lastName.charAt(0).toUpperCase()}${this.lastName.slice(1)}`,
        dept: this.dept.charAt(0).toUpperCase() + this.dept.slice(1),
        position: this.position.charAt(0).toUpperCase() + this.position.slice(1),
      }).then(this.$router.push('/'))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>

</style>template
