'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string; phone?: string; address?: string; city?: string }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const syncFirebaseUser = async (firebaseUser: any) => {
    try {
      const res = await fetch('/api/auth/firebase-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to sync Firebase account' };
    } catch {
      return { success: false, error: 'Network error syncing account' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { signInWithPopup } = await import('firebase/auth');
      const { getFirebaseAuth, getGoogleProvider } = await import('@/lib/firebase');
      const auth = await getFirebaseAuth();
      if (!auth) {
        return {
          success: false,
          error: 'Firebase Auth is only supported in browser environment.',
        };
      }
      const provider = await getGoogleProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        return await syncFirebaseUser(result.user);
      }
      return { success: false, error: 'Google sign-in was cancelled.' };
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      if (err.code === 'auth/api-key-not-valid' || err.code === 'auth/invalid-api-key') {
        return {
          success: false,
          error: 'Firebase API Key is missing. Please add your NEXT_PUBLIC_FIREBASE_API_KEY in the .env file.',
        };
      }
      if (err.code === 'auth/unauthorized-domain') {
        return {
          success: false,
          error: 'Domain not authorized in Firebase Console! Please add localhost to Authorized Domains.',
        };
      }
      return { success: false, error: err.message || 'Google Sign-in failed.' };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed.' };
    } catch {
      return { success: false, error: 'A network error occurred.' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error || 'Registration failed.' };
    } catch {
      return { success: false, error: 'A network error occurred.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      try {
        const { signOut } = await import('firebase/auth');
        const { getFirebaseAuth } = await import('@/lib/firebase');
        const auth = await getFirebaseAuth();
        if (auth) await signOut(auth);
      } catch {
        // ignore
      }
      setUser(null);
    } catch {
      setUser(null);
    }
  };

  const updateProfile = async (data: { name: string; phone?: string; address?: string; city?: string }) => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData.success && resData.user) {
        setUser(resData.user);
        return { success: true };
      }
      return { success: false, error: resData.error || 'Failed to update profile.' };
    } catch {
      return { success: false, error: 'Network error.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
