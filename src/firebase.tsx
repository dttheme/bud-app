import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { unsubscribeFromAuth, UserProvider } from "./providers/user.provider";
import { config } from "./config";

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => {
  auth.signOut().then(unsubscribeFromAuth());
};

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
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.log("Error fetching user", error.message);
    return;
  }
};

export default firebase;
