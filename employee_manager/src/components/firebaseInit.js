import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initilizeApp(firebaseConfig);

export default firebaseApp.firestore();
