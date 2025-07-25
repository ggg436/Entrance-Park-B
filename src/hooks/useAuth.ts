import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string, userType: 'agency' | 'user') => {
    try {
      // Create the user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        displayName: email.split('@')[0],
        email: email,
        photoURL: '/placeholder.svg',
        handle: `@${email.split('@')[0]}`,
        userType: userType,
        followers: [],
        following: [],
        followersCount: 0,
        followingCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: email === 'sanjokgharti01@gmail.com'
      });
      
      return userCredential;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signup,
    login,
    logout
  };
} 