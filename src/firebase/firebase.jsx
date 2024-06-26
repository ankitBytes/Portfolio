// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsfBHQd3RV8ASVi7gCSQyDMXDAnD-7wMQ",
  authDomain: "portfolio-6a8ed.firebaseapp.com",
  databaseURL: "https://portfolio-6a8ed-default-rtdb.firebaseio.com",
  projectId: "portfolio-6a8ed",
  storageBucket: "portfolio-6a8ed.appspot.com",
  messagingSenderId: "437509697942",
  appId: "1:437509697942:web:838e5ad9ecb48ab7dd6db7",
  measurementId: "G-JBZP1WY691"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);