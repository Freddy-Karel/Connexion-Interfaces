import styles from './Radio.module.scss';

/**
 * Composant Radio - Bouton radio personnalisable
 * @param {string} label - Label descriptif du radio
 * @param {boolean} checked - État de sélection
 * @param {function} onChange - Fonction appelée au changement de sélection
 * @param {string} className - Classes CSS supplémentaires
 * @param {string} name - Nom du groupe radio
 * @param {string} value - Valeur du radio button
 */
const Radio = ({ 
  label, 
  checked = false, 
  onChange, 
  className = '', 
  name,
  value 
}) => {
  return (
    <div className={`${styles.radioContainer} ${className}`}>
      <label className={styles.label}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={styles.hiddenInput}
        />
        <span className={styles.customRadio}></span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
    </div>
  );
};

export default Radio;