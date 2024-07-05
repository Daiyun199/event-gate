// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuAv9FhVR5ed3v7HhUwpszGgCgF93VkhI",
  authDomain: "event-gate-e6d07.firebaseapp.com",
  projectId: "event-gate-e6d07",
  storageBucket: "event-gate-e6d07.appspot.com",
  messagingSenderId: "556838513876",
  appId: "1:556838513876:web:3ffa535ab0361536301f41",
  measurementId: "G-B6S0WXSQJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
const auth = getAuth();
export {googleProvider,auth,storage}
