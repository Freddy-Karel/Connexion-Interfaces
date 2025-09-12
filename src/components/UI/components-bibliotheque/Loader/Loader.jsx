import styles from './Loader.module.scss';

/**
 * Composant Loader - Indicateur de chargement
 * @param {string} size - Taille du loader: 'small', 'medium', 'large'
 * @param {string} className - Classes CSS supplémentaires
 * @param {string} variant - Type de loader: 'spinner', 'dots', 'progress'
 */
const Loader = ({ 
  size = 'medium', 
  className = '', 
  variant = 'spinner' 
}) => {
  // Rendu conditionnel basé sur la variante
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={styles.dotsLoader}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        );
      
      case 'progress':
        return (
          <div className={styles.progressLoader}>
            <div className={styles.progressBar}></div>
          </div>
        );
      
      case 'spinner':
      default:
        return <div className={styles.spinner}></div>;
    }
  };

  return (
    <div 
      className={`${styles.loader} ${styles[size]} ${styles[variant]} ${className}`}
      role="status"
      aria-label="Chargement en cours"
    >
      {renderLoader()}
      <span className={styles.srOnly}>Chargement en cours</span>
    </div>
  );
};

export default Loader;