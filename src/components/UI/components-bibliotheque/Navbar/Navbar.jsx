import styles from './Navbar.module.scss';

/**
 * Composant Navbar - Barre de navigation principale
 * @param {ReactNode} logo - Élément logo (optionnel)
 * @param {Array} links - Tableau de liens [{label: string, href: string}]
 * @param {function} onLogout - Fonction appelée au logout (optionnel)
 * @param {string} className - Classes CSS supplémentaires
 */
const Navbar = ({ logo, links = [], onLogout, className = '' }) => {
  return (
    // 🔥 MODIFICATION: Classes CSS mises à jour avec le nouveau namespace
    <nav className={`${styles.navbarComponent} ${className}`}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        {logo && <div className={styles.navbarLogo}>{logo}</div>}
        
        {/* Liens de navigation */}
        <div className={styles.navbarLinks}>
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className={styles.navbarLink}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Bouton Logout */}
        {onLogout && (
          <button 
            onClick={onLogout} 
            className={styles.navbarLogoutButton}
          >
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;