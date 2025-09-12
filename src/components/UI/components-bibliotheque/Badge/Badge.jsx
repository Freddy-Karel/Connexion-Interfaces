import styles from './Badge.module.scss';

/**
 * Composant Badge - Étiquette colorée pour afficher des statuts
 * @param {string} children - Contenu du badge
 * @param {string} variant - Style: 'success', 'error', 'warning', 'info', 'neutral'
 * @param {string} className - Classes CSS supplémentaires
 */
const Badge = ({ children, variant = 'neutral', className = '' }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;