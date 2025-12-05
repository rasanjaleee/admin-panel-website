// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';




const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY || "AIzaSyAYpaqQB2p3AMwgZ2IJ1yoDyPscNnxZF6M",
  authDomain: "admin-panel-website-2becd.firebaseapp.com",
  projectId: "admin-panel-website-2becd",
  storageBucket: "admin-panel-website-2becd.firebasestorage.app",
  messagingSenderId: "621548398474",
  appId: "1:621548398474:web:aa56508559a05708e7ca73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);  
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, db, analytics,firestore };