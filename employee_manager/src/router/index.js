import Vue from 'vue';
import VueRouter from 'vue-router';
import db from '../components/firebaseInit';

import Dashboard from '../views/Dashboard.vue';
import EditEmployee from '../views/EditEmployee.vue';
import ViewEmployee from '../views/ViewEmployee.vue';
import NewEmployee from '../views/NewEmployee.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'dashboard',
  component: Dashboard,
  meta: {
    requiresAuth: true,
  },
},
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    requiresGuest: true,
  },
},
{
  path: '/register',
  name: 'register',
  component: Register,
  meta: {
    requiresGuest: true,
  },
},
{
  path: '/new',
  name: 'newEmployee',
  component: NewEmployee,
  meta: {
    requiresAuth: true,
  },
},
{
  path: '/edit/:employee_id',
  name: 'editEmployee',
  component: EditEmployee,
  meta: {
    requiresAuth: true,
  },
},
{
  path: '/:employee_id',
  name: 'viewEmployee',
  component: ViewEmployee,
  meta: {
    requiresAuth: true,
  },
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!db.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (db.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
