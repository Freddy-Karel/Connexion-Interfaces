import { useState } from 'react';
// Import des composants Mocks dont tu dépends
import Input from '../Input';
import Button from '../Button';
// Import des styles spécifiques à SearchBar (on les créera après)
import styles from './SearchBar.module.scss';

const SearchBar = ({ onSearch, placeholder = "Rechercher...", className = '' }) => {
  // State pour gérer la valeur de recherche
  const [query, setQuery] = useState('');

  // Fonction appelée à la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    onSearch(query); // Transmet la requête à la fonction parente
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`${styles.searchBar} ${className}`}
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <Button 
        type="submit" 
        label="🔍" 
        variant="primary" 
        className={styles.button} 
      />
    </form>
  );
};

export default SearchBar;