import { useState } from 'react';
import styles from './Avatar.module.scss';

/**
 * Composant Avatar - Représentation visuelle d'un utilisateur
 * @param {string} src - URL de l'image de l'avatar
 * @param {string} alt - Texte alternatif pour l'accessibilité
 * @param {string} size - Taille: 'small', 'medium', 'large', 'xlarge'
 * @param {string} className - Classes CSS supplémentaires
 * @param {ReactNode} children - Contenu à afficher si pas d'image
 * @param {string} fallback - Texte de fallback si l'image ne charge pas
 */
const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'medium', 
  className = '', 
  children,
  fallback 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Générer les initiales à partir du alt text
  const getInitials = () => {
    if (!alt || alt === 'Avatar') return '?';
    
    return alt
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Déterminer ce qu'il faut afficher
  const renderContent = () => {
    if (children) {
      return children;
    }
    
    if (imageError && fallback) {
      return fallback;
    }
    
    if (imageError) {
      return getInitials();
    }
    
    return null;
  };

  const hasImage = src && !imageError;
  const showContent = !hasImage || !imageLoaded;

  return (
    <div 
      className={`${styles.avatar} ${styles[size]} ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Image de l'avatar */}
      {hasImage && (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      )}
      
      {/* Fallback content */}
      {showContent && (
        <div className={styles.fallback}>
          {renderContent()}
        </div>
      )}
      
      {/* Badge indicator (optionnel) */}
    </div>
  );
};

export default Avatar;