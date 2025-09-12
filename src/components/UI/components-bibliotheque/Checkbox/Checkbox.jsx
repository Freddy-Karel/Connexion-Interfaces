import styles from './Checkbox.module.scss';

/**
 * Composant Checkbox - Case à cocher personnalisable
 * @param {string} label - Label descriptif de la checkbox
 * @param {boolean} checked - État de coche
 * @param {function} onChange - Fonction appelée au changement d'état
 * @param {string} className - Classes CSS supplémentaires
 * @param {string} name - Nom du champ pour l'identification
 */
const Checkbox = ({ 
  label, 
  checked = false, 
  onChange, 
  className = '', 
  name 
}) => {
  return (
    <div className={`${styles.checkboxContainer} ${className}`}>
      <label className={styles.label}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={styles.hiddenInput}
        />
        <span className={styles.customCheckbox}></span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;