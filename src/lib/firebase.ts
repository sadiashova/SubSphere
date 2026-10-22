import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCg-E1gSzYWf5UPXjZ9lPreIWg9ST2H6Dc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "subsphere-1a90a.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "subsphere-1a90a",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "subsphere-1a90a.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "334423537542",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:334423537542:web:6605cd136f7d9a0e4f9e07",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-5C56P7P406"
};

export const getFirebaseApp = () => {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
};

export const getFirebaseAuth = async () => {
  if (typeof window === 'undefined') return null;
  const { getAuth } = await import('firebase/auth');
  const app = getFirebaseApp();
  return getAuth(app);
};

export const getGoogleProvider = async () => {
  const { GoogleAuthProvider } = await import('firebase/auth');
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return provider;
};
