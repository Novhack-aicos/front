import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDphyW7uUwoG-obi4O4mdUcetu0bpUkgl0",
    authDomain: "novhack-d4972.firebaseapp.com",
    databaseURL: "https://novhack-d4972.firebaseio.com",
    projectId: "novhack-d4972",
    storageBucket: "novhack-d4972.appspot.com",
    messagingSenderId: "14391577502",
    appId: "1:14391577502:web:6e17b2ac3710abb8"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
