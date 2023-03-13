// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEB5NyLuOfHsiwuKLY7ihOGAxp3_FGtqw",
    authDomain: "signatext.firebaseapp.com",
    projectId: "signatext",
    storageBucket: "signatext.appspot.com",
    messagingSenderId: "63942141864",
    appId: "1:63942141864:web:be1937d61b1e4575189f9d",
    measurementId: "G-M91C436V1E"
};

export const getFirebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const fireStoreDB = getFirestore(getFirebaseApp);