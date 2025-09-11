import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { saveToStorage, getFromStorage, removeFromStorage } from '../utils/localStorage';

// Connexion avec email/mot de passe
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      method: 'email'
    };

    saveToStorage('currentUser', userData); // Rétabli: Enregistre les données utilisateur dans le stockage local
    return { success: true, user: userData };
  } catch (error) {
    let errorMessage = "Erreur de connexion";

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = "Email invalide";
        break;
      case 'auth/user-disabled':
        errorMessage = "Compte désactivé";
        break;
      case 'auth/user-not-found':
        errorMessage = "Utilisateur non trouvé";
        break;
      case 'auth/wrong-password':
        errorMessage = "Mot de passe incorrect";
        break;
      default:
        errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
};

// Inscription avec email/mot de passe
export const registerWithEmail = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Mettre à jour le profil avec le nom
    await updateProfile(user, {
      displayName: name
    });

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL,
      method: 'email'
    };

    saveToStorage('currentUser', userData); // Rétabli: Enregistre les données utilisateur dans le stockage local
    return { success: true, user: userData };
  } catch (error) {
    let errorMessage = "Erreur lors de la création du compte";

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "Cet email est déjà utilisé";
        break;
      case 'auth/invalid-email':
        errorMessage = "Email invalide";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Opération non autorisée";
        break;
      case 'auth/weak-password':
        errorMessage = "Mot de passe trop faible";
        break;
      default:
        errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
};

// Connexion avec Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      method: 'google'
    };

    saveToStorage('currentUser', userData); // Rétabli: Enregistre les données utilisateur dans le stockage local
    return { success: true, user: userData };
  } catch (error) {
    let errorMessage = "Erreur de connexion Google";

    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = "Connexion annulée";
        break;
      case 'auth/popup-blocked':
        errorMessage = "Popup bloqué, veuillez autoriser les popups";
        break;
      default:
        errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
};

// Déconnexion
export const logout = async () => {
  try {
    await signOut(auth);
    removeFromStorage('currentUser');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};