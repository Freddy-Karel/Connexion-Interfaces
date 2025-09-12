import { useState } from 'react';
import styles from './Sidebar.module.scss';

/**
 * Composant Sidebar - Menu latéral navigation
 * @param {Array} items - Tableau d'items de menu [{id: string, label: string, icon: ReactNode}]
 * @param {boolean} collapsed - État replié du sidebar
 * @param {function} onSelect - Fonction appelée à la sélection d'un item
 * @param {string} className - Classes CSS supplémentaires
 */
const Sidebar = ({ items = [], collapsed = false, onSelect, className = '' }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    onSelect?.(itemId);
  };

  return (
    // 🔥 MODIFICATION: Classes CSS mises à jour avec le nouveau namespace
    <aside className={`${styles.sidebarComponent} ${collapsed ? styles.collapsed : ''} ${className}`}>
      <nav className={styles.sidebarNav}>
        {items.map(item => (
          <button
            key={item.id}
            className={`${styles.sidebarItem} ${activeItem === item.id ? styles.active : ''}`}
            onClick={() => handleItemClick(item.id)}
            title={collapsed ? item.label : ''} // Tooltip pour mode collapsed
          >
            {item.icon && <span className={styles.sidebarIcon}>{item.icon}</span>}
            {!collapsed && <span className={styles.sidebarLabel}>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;