import firebaseConfig from './firebaseConfig';

const firebase = require('firebase/app');
require('firebase/firestore');

const db = firebase.initializeApp(firebaseConfig);

export default db;
