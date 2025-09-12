import styles from './Select.module.scss';

/**
 * Composant Select - Menu déroulant personnalisable
 * @param {string} label - Label descriptif du select
 * @param {Array} options - Options du menu [{value: string, label: string}]
 * @param {string} value - Valeur sélectionnée
 * @param {function} onChange - Fonction appelée au changement de sélection
 * @param {string} className - Classes CSS supplémentaires
 * @param {string} name - Nom du champ pour l'identification
 */
const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  className = '', 
  name 
}) => {
  return (
    <div className={`${styles.selectContainer} ${className}`}>
      {/* Label du select */}
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      
      {/* Menu déroulant */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
      >
        <option value="">Sélectionnez une option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;