import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getFromStorage, saveToStorage, removeFromStorage } from '../utils/localStorage';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier d'abord le localStorage pour un état de connexion rapide
    const storedUser = getFromStorage('currentUser');
    if (storedUser) {
      setCurrentUser(storedUser);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Utilisateur connecté
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
        setCurrentUser(userData);
        saveToStorage('currentUser', userData);
      } else {
        // Utilisateur déconnecté
        setCurrentUser(null);
        removeFromStorage('currentUser');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { currentUser, loading };
};