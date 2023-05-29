// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCApG40-CAdieII8H1n93zOoK6dDmPaxRg",
  authDomain: "shopeez-5a7c4.firebaseapp.com",
  projectId: "shopeez-5a7c4",
  storageBucket: "shopeez-5a7c4.appspot.com",
  messagingSenderId: "90621924649",
  appId: "1:90621924649:web:71013082045f294c979338",
  measurementId: "G-0J69BRGX99"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth,db,storage}