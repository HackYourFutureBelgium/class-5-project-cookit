import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseconfig = {
  apiKey: "AIzaSyCHCw0nHjUwds38zc9k8rPdkF4UPVzl4DU",
  authDomain: "hyf-cookit.firebaseapp.com",
  databaseURL: "https://hyf-cookit.firebaseio.com",
  projectId: "hyf-cookit",
  storageBucket: "hyf-cookit.appspot.com",
  messagingSenderId: "1012416650526",
  appId: "1:1012416650526:web:f8d0ea5cc159cb61c0fd0f",
  measurementId: "G-THV5DHRPTL"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseconfig);
}

export default firebase;