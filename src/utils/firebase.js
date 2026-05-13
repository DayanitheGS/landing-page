import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these with your project keys from the Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoPlaceholderKeyForAdminTesting",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "inten-photo-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "inten-photo-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "inten-photo-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log("🔥 Firebase Connection successfully initialized.");
} catch (error) {
  console.warn("⚠️ Firebase Initialization warning (using demo bypass mode):", error.message);
}

export { auth, db, storage };
