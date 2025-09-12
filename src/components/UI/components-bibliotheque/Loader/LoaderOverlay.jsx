import Loader from './Loader';
import styles from './Loader.module.scss';

/**
 * Composant LoaderOverlay - Loader en overlay plein écran
 * @param {string} size - Taille du loader
 * @param {string} variant - Type de loader
 * @param {string} text - Texte à afficher sous le loader
 * @param {boolean} withOverlay - Afficher l'overlay semi-transparent
 */
const LoaderOverlay = ({ 
  size = 'large', 
  variant = 'spinner', 
  text = 'Chargement...',
  withOverlay = true 
}) => {
  return (
    <div className={withOverlay ? styles.overlay : ''}>
      <div className={styles.container}>
        <Loader size={size} variant={variant} />
        {text && <span className={styles.loadingText}>{text}</span>}
      </div>
    </div>
  );
};

export default LoaderOverlay;