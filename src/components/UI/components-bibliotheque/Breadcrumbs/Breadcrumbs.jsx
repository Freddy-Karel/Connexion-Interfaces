import styles from './Breadcrumbs.module.scss';

/**
 * Composant Breadcrumbs - Fil d'Ariane de navigation
 * @param {Array} items - Tableau d'objets [{label: string, href: string}]
 * @param {string} className - Classes CSS supplémentaires
 */
const Breadcrumbs = ({ items = [], className = '' }) => {
  return (
    <nav className={`${styles.breadcrumbs} ${className}`}>
      {items.map((item, index) => (
        <span key={index} className={styles.item}>
          {index > 0 && <span className={styles.separator}>/</span>}
          {item.href ? (
            <a href={item.href} className={styles.link}>
              {item.label}
            </a>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;