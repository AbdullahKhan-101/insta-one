import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBgRM_JAMqIPBdqA7NrT0gE1-m5CZuqMUk",
  authDomain: "auth-practice-65be3.firebaseapp.com",
  projectId: "auth-practice-65be3",
  storageBucket: "auth-practice-65be3.appspot.com",
  messagingSenderId: "1082461496866",
  appId: "1:1082461496866:web:67740845ae139113860c7b",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
