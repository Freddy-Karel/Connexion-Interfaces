import styles from './Input.module.scss';

/**
 * Composant Input - Champ de saisie textuelle personnalisable
 * @param {string} label - Label descriptif du champ
 * @param {string} type - Type de champ: 'text', 'email', 'password', 'number', etc.
 * @param {string} placeholder - Texte d'aide affiché quand le champ est vide
 * @param {string} value - Valeur contrôlée du champ
 * @param {function} onChange - Fonction appelée à chaque changement de valeur
 * @param {string} error - Message d'erreur à afficher (si présent)
 * @param {string} className - Classes CSS supplémentaires
 * @param {string} name - Nom du champ pour l'identification
 */
const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  className = '', 
  name 
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {/* Label du champ */}
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      
      {/* Champ de saisie */}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      
      {/* Message d'erreur */}
      {error && (
        <span className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;