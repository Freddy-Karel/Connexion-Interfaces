import { useEffect } from 'react';
import styles from './Modal.module.scss';

/**
 * Composant Modal - Fenêtre modale overlay
 * @param {boolean} isOpen - Contrôle l'ouverture/fermeture de la modal
 * @param {function} onClose - Callback appelé à la fermeture
 * @param {ReactNode} children - Contenu de la modal
 * @param {string} className - Classes CSS supplémentaires
 */
const Modal = ({ isOpen, onClose, children, className = '' }) => {
  // Bloque le scroll quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Ferme la modal en cliquant à l'extérieur
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Ferme la modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${className}`}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;