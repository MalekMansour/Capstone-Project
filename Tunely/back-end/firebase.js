import firebase from "firebase/app";
import { firebaseConfig } from "firebaseConfig"; 

// Initialize Firebase
if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
