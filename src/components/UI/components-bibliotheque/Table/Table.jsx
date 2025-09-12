import { useState, useMemo } from 'react';
import styles from './Table.module.scss';

/**
 * Composant Table - Tableau avec tri et pagination
 * @param {Array} columns - Configuration des colonnes [{key: string, label: string, sortable: boolean}]
 * @param {Array} data - Données à afficher
 * @param {boolean} sortable - Activer le tri
 * @param {boolean} paginated - Activer la pagination
 * @param {number} pageSize - Nombre d'items par page (si paginated)
 * @param {string} className - Classes CSS supplémentaires
 */
const Table = ({ 
  columns = [], 
  data = [], 
  sortable = false, 
  paginated = false, 
  pageSize = 10, 
  className = '' 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Tri des données
  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, sortable]);

  // Pagination des données
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, paginated, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table}>
        {/* En-tête du tableau */}
        <thead>
          <tr>
            {columns.map(column => (
              <th 
                key={column.key}
                onClick={() => handleSort(column.key)}
                className={`
                  ${sortable && column.sortable ? styles.sortable : ''}
                  ${sortConfig.key === column.key ? styles[sortConfig.direction] : ''}
                `}
              >
                {column.label}
                {sortable && column.sortable && (
                  <span className={styles.sortIcon}>
                    {sortConfig.key === column.key 
                      ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')
                      : ' ↕'
                    }
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Corps du tableau */}
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.key}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          
          <span>Page {currentPage} sur {totalPages}</span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;