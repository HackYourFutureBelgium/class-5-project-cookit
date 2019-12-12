
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyAn2EZY3FMtSsGiP3TuIFd9m_U-XYB1Xow",
    authDomain: "react-redux-firebase-49b2f.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-49b2f.firebaseio.com",
    projectId: "react-redux-firebase-49b2f",
    storageBucket: "react-redux-firebase-49b2f.appspot.com",
    messagingSenderId: "196455244965"
  };

  firebase.initializeApp(config);

  export default firebase;
