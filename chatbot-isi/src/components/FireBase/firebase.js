// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase config (Replace with your actual config values)
const firebaseConfig = {
    apiKey: "AIzaSyCzCRKgwU9CSHA65p-9cGhCKv_3kNFpuMM",
    authDomain: "chatbot-isi.firebaseapp.com",
    projectId: "chatbot-isi",
    storageBucket: "chatbot-isi.firebasestorage.app",
    messagingSenderId: "137617228266",
    appId: "1:137617228266:web:4a09a4c75001e5c421f293"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get authentication instance
const auth = getAuth(app);

// Set up Google Auth provider
const googleProvider = new GoogleAuthProvider();

// Export Firebase functions
export { auth, googleProvider, signInWithPopup };
