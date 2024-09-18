// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from  "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk23C_SOcC8vXvRySrXUEHuJgWxmTKTeI",
  authDomain: "writers-forest.firebaseapp.com",
  projectId: "writers-forest",
  storageBucket: "writers-forest.appspot.com",
  messagingSenderId: "1003414426995",
  appId: "1:1003414426995:web:6140a6934b7eda074aa106",
  measurementId: "G-7EG5CLS5QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();