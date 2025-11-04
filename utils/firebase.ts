// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "@firebase/auth";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLlxRPy-zhKgM5azJ8gD4MD00guicYj0k",
    authDomain: "design-forge-114f3.firebaseapp.com",
    projectId: "design-forge-114f3",
    storageBucket: "design-forge-114f3.firebasestorage.app",
    messagingSenderId: "276861629573",
    appId: "1:276861629573:web:5dde4ab8560f69da26a5ec",
    measurementId: "G-DWQLRSQ6BE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app)
export const db = getFirestore(app);
