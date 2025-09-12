import { useRef } from 'react';
import Button from '../Button';
import styles from './FileUpload.module.scss';

const FileUpload = ({ 
  label = "Choisir un fichier", 
  accept, 
  onFileSelect, 
  className = '' 
}) => {
  // useRef pour accéder à l'input file caché
  const fileInputRef = useRef(null);

  // Fonction déclenchée quand le bouton est cliqué
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Fonction déclenchée quand un fichier est sélectionné
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
    // Reset la valeur pour pouvoir sélectionner le même fichier à nouveau
    e.target.value = null;
  };

  return (
    <div className={`${styles.fileUpload} ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      <Button
        label={label}
        onClick={handleButtonClick}
        variant="secondary"
        className={styles.button}
      />
    </div>
  );
};

export default FileUpload;