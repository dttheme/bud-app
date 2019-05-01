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

export const createUserProfileDocument = async (user, additionalData?) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email, photoUrl } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        // photoUrl,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument: any = await firestore
      .collection("users")
      .doc(uid)
      .get();
    return { ...userDocument.data(), uid };
  } catch (error) {
    console.log("Error fetching user", error.message);
  }
};

export default firebase;
