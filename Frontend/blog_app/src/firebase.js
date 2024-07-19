// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6fb47.firebaseapp.com",
  projectId: "mern-blog-6fb47",
  storageBucket: "mern-blog-6fb47.appspot.com",
  messagingSenderId: "349061354192",
  appId: "1:349061354192:web:f69643435e4fa258f784d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);