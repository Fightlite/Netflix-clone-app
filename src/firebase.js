// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7y52XO3uH1hA69p4eLaEjfykorXAVs6M",
  authDomain: "netflix-app-c22a6.firebaseapp.com",
  projectId: "netflix-app-c22a6",
  storageBucket: "netflix-app-c22a6.appspot.com",
  messagingSenderId: "204998644630",
  appId: "1:204998644630:web:86780736553d8f875943b7",
  measurementId: "G-YLBBC5Y22N"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();