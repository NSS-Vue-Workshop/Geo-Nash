import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const signOut = () => auth.signOut();
export const signIn = () => {
  return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};
