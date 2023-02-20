const firebase = require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyApVjocGQ54ce4IoLT4lHMU_2oeTEHzrn8",
    authDomain: "practice-firebase-5ccd8.firebaseapp.com",
    projectId: "practice-firebase-5ccd8",
    storageBucket: "practice-firebase-5ccd8.appspot.com",
    messagingSenderId: "869415489289",
    appId: "1:869415489289:web:958250a978264e109e4dd8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const Employee = db.collection("Employees");
  const Admin = db.collection("Admins");
  const Task = db.collection("Tasks")

  module.exports = {Employee, Admin, Task}