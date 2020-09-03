import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBPsahxppBCHu-MKqBHivEZgFGFxMlhyfc",
    authDomain: "my-project-plan-2de98.firebaseapp.com",
    databaseURL: "https://my-project-plan-2de98.firebaseio.com",
    projectId: "my-project-plan-2de98",
    storageBucket: "my-project-plan-2de98.appspot.com",
    messagingSenderId: "966195914316",
    appId: "1:966195914316:web:eee07df46def72219176e9",
    measurementId: "G-5VG86XNH4M"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ });

  export default firebase;