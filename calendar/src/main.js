import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/firestore';
import fConfig from './components/firebaseConfig';
import VueTextareAutosize from 'vue-textarea-autosize';

Vue.use(VueTextareAutosize);

Vue.config.productionTip = false

firebase.initializeApp(fConfig);
// eslint-disable-next-line no-unused-vars
export const db = firebase.firestore();

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')