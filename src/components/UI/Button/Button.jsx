import styles from './Button.module.scss';

/**
 * Composant Button - Bouton personnalisable avec plusieurs variants
 * @param {string} label - Texte du bouton
 * @param {function} onClick - Fonction appelée au clic
 * @param {string} variant - Style du bouton: 'primary', 'secondary', 'success', 'danger', 'warning'
 * @param {boolean} disabled - Désactive le bouton
 * @param {boolean} loading - Affiche un état de chargement
 * @param {string} className - Classes CSS supplémentaires
 */
const Button = ({
  children, // Changed from label to children
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  type = 'button' // Added type prop for form buttons
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${disabled ? styles.disabled : ''} 
        ${loading ? styles.loading : ''} 
        ${className}
      `}
      type={type} // Added type attribute
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          Chargement...
        </>
      ) : (
        children // Render children instead of label
      )}
    </button>
  );
};

export default Button;