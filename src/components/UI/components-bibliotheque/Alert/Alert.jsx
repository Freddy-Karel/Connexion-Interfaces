import { useState, useEffect, useCallback } from 'react';
import styles from './Alert.module.scss';

/**
 * Composant Alert - Message d'alerte contextuel
 * @param {string} message - Message à afficher
 * @param {string} type - Type d'alerte: 'success', 'warning', 'error'
 * @param {number} autoClose - Délai en ms avant fermeture automatique (0 = pas de fermeture auto)
 * @param {function} onClose - Callback appelé à la fermeture
 * @param {string} className - Classes CSS supplémentaires
 */
const Alert = ({ 
  message, 
  type = 'info', 
  autoClose = 0, 
  onClose, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Déplacer handleClose dans un useCallback pour éviter les dépendances circulaires
  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Attend la fin de l'animation
    }
  }, [onClose]); // onClose est maintenant une dépendance

  // Fermeture automatique si autoClose > 0
  useEffect(() => {
    if (autoClose > 0 && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, handleClose]); // Ajouter handleClose aux dépendances

  if (!isVisible || !message) return null;

  return (
    <div className={`${styles.alert} ${styles[type]} ${className} ${styles.slideIn}`}>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <button 
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Fermer l'alerte"
        >
          ×
        </button>
      </div>
      
      {/* Barre de progression pour la fermeture auto */}
      {autoClose > 0 && (
        <div 
          className={styles.progressBar} 
          style={{ animationDuration: `${autoClose}ms` }}
        />
      )}
    </div>
  );
};

export default Alert;