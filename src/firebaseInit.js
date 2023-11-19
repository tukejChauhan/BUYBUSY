// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD1iXKYH5W1hRJ8mgfY3PlXfTKP9wjFSY",
  authDomain: "blogging-webapp-376f9.firebaseapp.com",
  projectId: "blogging-webapp-376f9",
  storageBucket: "blogging-webapp-376f9.appspot.com",
  messagingSenderId: "857899138167",
  appId: "1:857899138167:web:b32c556581fe88347a9a72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
