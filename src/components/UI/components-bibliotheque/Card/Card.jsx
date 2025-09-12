import styles from './Card.module.scss';

/**
 * Composant Card - Conteneur avec header, content et footer
 * @param {ReactNode} header - Contenu du header (optionnel)
 * @param {ReactNode} children - Contenu principal
 * @param {ReactNode} footer - Contenu du footer (optionnel)
 * @param {string} className - Classes CSS supplémentaires
 */
const Card = ({ header, children, footer, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;