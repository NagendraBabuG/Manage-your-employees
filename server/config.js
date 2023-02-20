

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//const firebase = require('firebase-admin');
import firebase from 'firebase'
// const firebase = require('firebase')
// Your web app's Firebase configuration
//import firebase from 'firebase/compat/app'
//import * as firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyApVjocGQ54ce4IoLT4lHMU_2oeTEHzrn8",
  authDomain: "practice-firebase-5ccd8.firebaseapp.com",
  projectId: "practice-firebase-5ccd8",
  storageBucket: "practice-firebase-5ccd8.appspot.com",
  messagingSenderId: "869415489289",
  appId: "1:869415489289:web:958250a978264e109e4dd8"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const Employee = db.collection("Employees");
export const Admin = db.collection("Admins");
// module.exports = {Employee, Admin};

//module.exports = Admin;