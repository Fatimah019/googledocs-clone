import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcgZYRJvdFH3XHWLdr-TSIh_lRgH3r--U",
  authDomain: "infinite-strata-322509.firebaseapp.com",
  databaseURL: "https://infinite-strata-322509-default-rtdb.firebaseio.com",
  projectId: "infinite-strata-322509",
  storageBucket: "infinite-strata-322509.appspot.com",
  messagingSenderId: "233010659825",
  appId: "1:233010659825:web:6355e3f5e29c59437d4450",
  measurementId: "G-SNV25MW14H",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
