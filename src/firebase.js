import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import dotenv from 'dotenv';
// dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyCMxIsW1TrfUwRVCGYsONv0j1edxdiqe8s",
    authDomain: "expense-tracker-demo-6ab16.firebaseapp.com",
    projectId: "expense-tracker-demo-6ab16",
    storageBucket: "expense-tracker-demo-6ab16.appspot.com",
    messagingSenderId: "980179188239",
    appId: "1:980179188239:web:f69267ae0484d08aed017a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();