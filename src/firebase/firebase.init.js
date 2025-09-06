// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlVxqzk38DVld_RIztZDNfS8HRkpgcneE",
  authDomain: "coffee-store-app-58902.firebaseapp.com",
  projectId: "coffee-store-app-58902",
  storageBucket: "coffee-store-app-58902.firebasestorage.app",
  messagingSenderId: "370867758941",
  appId: "1:370867758941:web:063e76f6eadf0d83e56ab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);