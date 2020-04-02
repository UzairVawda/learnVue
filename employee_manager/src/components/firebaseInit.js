import firebaseConfig from './firebaseConfig';

const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const db = firebase.initializeApp(firebaseConfig);

export default db;
