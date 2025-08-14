// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; // Firestore için
import { getAuth } from 'firebase/auth'; // Authentication için
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLd_M0lQvQWcnfQCR_0l6WSW_5hapOVX0",
    authDomain: "roketkafe-7b63b.firebaseapp.com",
    projectId: "roketkafe-7b63b",
    storageBucket: "roketkafe-7b63b.firebasestorage.app",
    messagingSenderId: "49195437497",
    appId: "1:49195437497:web:5a237a70eeb2bca9caba68",
    measurementId: "G-VJW8037L58",
    databaseURL: "https://roketkafe-7b63b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);