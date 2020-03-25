<template>
  <div id="viewEmployee">
    <div class="row">
      <div class="col s12">
        <ul class="collection with-header">
          <li class="collection-header">
            <h4> {{name}} </h4>
          </li>
          <li class="collection-item">Employee ID: {{employee_id}}</li>
          <li class="collection-item">Department: {{dept}}</li>
          <li class="collection-item">Position: {{position}}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col s1">
        <router-link to="/" class="btn grey darken-2 waves-effect"> Back </router-link>
      </div>
      <div class="col s1">
        <router-link v-bind:to="{name: 'editEmployee', params: {employee_id: employee_id}}"
            class="btn light-blue darken-2 waves-effect">
            Edit
        </router-link>
      </div>
      <div class="col s1">
        <a @click="deleteEmployee" class="btn deep-orange darken-2 waves-effect">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint max-len: ["error", { "code": 125 }] */
import db from '../components/firebaseInit';

export default {
  name: 'viewEmployee',
  data() {
    return {
      employee_id: null,
      name: null,
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
            vm.name = doc.data().name;
            vm.dept = doc.data().dept.charAt(0).toUpperCase() + doc.data().dept.slice(1);
            vm.position = doc.data().position.charAt(0).toUpperCase() + doc.data().position.slice(1);
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
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    deleteEmployee() {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete?')) {
        db.firestore().collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/');
            });
          });
      }
    },
  },
};
</script>
