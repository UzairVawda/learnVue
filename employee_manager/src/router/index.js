import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import EditEmployee from '../views/EditEmployee.vue';
import ViewEmployee from '../views/ViewEmployee.vue';
import NewEmployee from '../views/NewEmployee.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'dashboard',
  component: Dashboard,
},
{
  path: '/new',
  name: 'newEmployee',
  component: NewEmployee,
},
{
  path: '/edit/:emp_id',
  name: 'editEmployee',
  component: EditEmployee,
},
{
  path: '/:emp_id',
  name: 'viewEmployee',
  component: ViewEmployee,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
