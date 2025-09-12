import styles from './Tabs.module.scss';

/**
 * Composant Tabs - Système d'onglets
 * @param {Array} tabs - Tableau d'onglets [{id: string, label: string}]
 * @param {string} activeTab - ID de l'onglet actif
 * @param {function} onChange - Fonction appelée au changement d'onglet
 * @param {string} className - Classes CSS supplémentaires
 */
const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`${styles.tabs} ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;