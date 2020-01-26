// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

try {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAIDx89pZpr9GqepXtKPBZQZaRaMg8Txlc",
    authDomain: "hsds-dev.firebaseapp.com",
    databaseURL: "https://hsds-dev.firebaseio.com",
    projectId: "hsds-dev",
    storageBucket: "hsds-dev.appspot.com",
    messagingSenderId: "973476140127",
    appId: "1:973476140127:web:51c1135a1a13c6f47477ea"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  throw e
}
console.error(firebase)

export default firebase
