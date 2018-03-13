// import firebase from 'firebase';
const firebase = require('firebase');
const config = {
  apiKey: "AIzaSyCmiVHfvNlbwLhM10YQD4YHbKhu79k-vM8",
  authDomain: "eventful-4f745.firebaseapp.com",
  databaseURL: "https://eventful-4f745.firebaseio.com",
  projectId: "eventful-4f745",
  storageBucket: "eventful-4f745.appspot.com",
  messagingSenderId: "357658145335"
};

firebase.initializeApp(config);
const database = firebase.database();


// export default database;
module.exports = database;