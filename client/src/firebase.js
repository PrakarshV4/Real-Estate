// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-60fb0.firebaseapp.com",
  projectId: "mern-estate-60fb0",
  storageBucket: "mern-estate-60fb0.appspot.com",
  messagingSenderId: "386259740911",
  appId: "1:386259740911:web:7771b9dce7e0538e98d31a",
  measurementId: "G-HELZ0MZ958"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);