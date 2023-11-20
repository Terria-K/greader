// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { GoogleAuthProvider, getAuth } from "firebase/auth";

const GoogleProvider = new GoogleAuthProvider();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSENGERID,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const FirestoreApp = getFirestore(app);
const AuthApp = getAuth(app);
const StorageApp = getStorage(app);

export { FirestoreApp, AuthApp, GoogleProvider, StorageApp }