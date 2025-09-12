import styles from './Textarea.module.scss';

/**
 * Composant Textarea - Zone de texte multiligne personnalisable
 * @param {string} label - Label descriptif de la textarea
 * @param {string} placeholder - Texte d'aide affiché quand la zone est vide
 * @param {string} value - Valeur contrôlée de la textarea
 * @param {function} onChange - Fonction appelée à chaque changement de valeur
 * @param {number} rows - Nombre de lignes visibles
 * @param {string} className - Classes CSS supplémentaires
 * @param {string} name - Nom du champ pour l'identification
 */
const Textarea = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  rows = 3, 
  className = '', 
  name 
}) => {
  return (
    <div className={`${styles.textareaContainer} ${className}`}>
      {/* Label de la textarea */}
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      
      {/* Zone de texte multiligne */}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={styles.textarea}
      />
    </div>
  );
};

export default Textarea;