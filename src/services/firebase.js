// Import des fonctions Firebase nécessaires
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWkmYngDJLH4jRE-6aLWmLSok6x02IivY",
  authDomain: "oauth-1354b.firebaseapp.com",
  projectId: "oauth-1354b",
  storageBucket: "oauth-1354b.firebasestorage.app",
  messagingSenderId: "371680327610",
  appId: "1:371680327610:web:d24fe6d90d397b5a6e0f83",
  measurementId: "G-8VTB7MYF5X"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser l'authentification Firebase
export const auth = getAuth(app);

// Configurer le fournisseur Google
export const googleProvider = new GoogleAuthProvider();

// Optionnel : personnaliser les scopes Google
googleProvider.addScope('email');
googleProvider.addScope('profile');

export default app;