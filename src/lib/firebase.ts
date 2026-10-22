import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'subsphere-1a90a.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'subsphere-1a90a',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'subsphere-1a90a.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
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
  return new GoogleAuthProvider();
};
