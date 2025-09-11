// Fonctions utilitaires pour le localStorage

// Récupérer des données du localStorage
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Erreur lors de la lecture du localStorage:', error);
    return null;
  }
};

// Sauvegarder des données dans le localStorage
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le localStorage:', error);
    return false;
  }
};

// Supprimer des données du localStorage
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du localStorage:', error);
    return false;
  }
};

// Vider tout le localStorage
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Erreur lors du vidage du localStorage:', error);
    return false;
  }
};