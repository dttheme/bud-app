import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyB6afpEJU0lM0b8N8dvYRP1-_LourQXpX8",
  authDomain: "bud-app-237e9.firebaseapp.com",
  databaseURL: "https://bud-app-237e9.firebaseio.com",
  projectId: "bud-app-237e9",
  storageBucket: "bud-app-237e9.appspot.com",
  messagingSenderId: "1069813271087"
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
