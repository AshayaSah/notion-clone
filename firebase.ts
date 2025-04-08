// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADkZotBITytqg_cZ8Kqk_xy2jjcckWtjQ",
  authDomain: "notion-s-dead-body.firebaseapp.com",
  projectId: "notion-s-dead-body",
  storageBucket: "notion-s-dead-body.firebasestorage.app",
  messagingSenderId: "798420865707",
  appId: "1:798420865707:web:b5a6a8ed8abe0095415dee"
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };