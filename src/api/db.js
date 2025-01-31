import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
export const auth = getAuth(app);

// Collections
export const dbCategories = db.collection("categories");
export const dbCards = db.collection("cards");
