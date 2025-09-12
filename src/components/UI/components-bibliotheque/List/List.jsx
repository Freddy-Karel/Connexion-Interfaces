import styles from './List.module.scss';

/**
 * Composant List - Liste d'éléments avec ou sans icônes
 * @param {Array} items - Tableau d'items à afficher
 * @param {function} renderItem - Fonction pour rendre chaque item (optionnel)
 * @param {boolean} withIcons - Afficher des icônes (optionnel)
 * @param {string} className - Classes CSS supplémentaires
 */
const List = ({ items = [], renderItem, withIcons = false, className = '' }) => {
  const defaultRenderItem = (item, index) => (
    <div key={index} className={styles.listItem}>
      {withIcons && item.icon && (
        <span className={styles.icon}>{item.icon}</span>
      )}
      <span className={styles.text}>{item.text || item}</span>
    </div>
  );

  return (
    <div className={`${styles.list} ${className}`}>
      {items.map((item, index) => 
        renderItem ? renderItem(item, index) : defaultRenderItem(item, index)
      )}
    </div>
  );
};

export default List;