import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import db from './components/firebaseInit';
import './components/firebaseConfig';

Vue.config.productionTip = false;

let app;
db.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
