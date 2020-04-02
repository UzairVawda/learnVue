<template>
  <div id="dashboard">

    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.employee_id}}: {{employee.name}}

        <router-link class="secondary-content" v-bind:to="{
            name: 'viewEmployee',
            params: {employee_id: employee.employee_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-larger red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from '../components/firebaseInit';

export default {
  name: 'dashboard',
  data() {
    return {
      employees: [],
    };
  },
  created() {
    db.firestore().collection('employees').orderBy('dept').get()
      .then(
        (snapshot) => {
          snapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              employee_id: doc.data().employee_id,
              name: doc.data().name,
              dept: doc.data().dept.charAt(0).toUpperCase() + doc.data().dept.slice(1),
              position: doc.data().position.charAt(0).toUpperCase() + doc.data().position.slice(1),
            };
            this.employees.push(data);
          });
        },
      )
      .catch((err) => {
        this.employees.push('Error getting documents', err);
      });
  },
};
</script>
