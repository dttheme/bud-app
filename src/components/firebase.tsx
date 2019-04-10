import firebase from "firebase/app";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyCD1ZwR4wD4Pvxu67OpmvMYjkZdlAW7SqY",
  authDomain: "bud-app-45e78.firebaseapp.com",
  databaseURL: "https://bud-app-45e78.firebaseio.com",
  projectId: "bud-app-45e78",
  storageBucket: "bud-app-45e78.appspot.com",
  messagingSenderId: "508059903479"
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
