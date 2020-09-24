import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   
    apiKey: "AIzaSyCSQK3o5HoVNIfsih1wXmwACodVT50f1qo",
    authDomain: "crwn-db-c940d.firebaseapp.com",
    databaseURL: "https://crwn-db-c940d.firebaseio.com",
    projectId: "crwn-db-c940d",
    storageBucket: "crwn-db-c940d.appspot.com",
    messagingSenderId: "15234030989",
    appId: "1:15234030989:web:41aeb97c37fe7ccb59b1c4",
    measurementId: "G-KMGED685H4"
      
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;


