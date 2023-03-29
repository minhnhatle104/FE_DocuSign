// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYNfuhCNFx5RyoYdBc6DnA9mrCjLBfD6Q",
    authDomain: "signatext-v02.firebaseapp.com",
    projectId: "signatext-v02",
    storageBucket: "signatext-v02.appspot.com",
    messagingSenderId: "325334712353",
    appId: "1:325334712353:web:d5749fe86d3f49e4402360",
    measurementId: "G-Q1ZC5M6C6J"
};

export const getFirebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const fireStoreDB = getFirestore(getFirebaseApp);