import Avatar from './Avatar'; // ← AJOUTE CET IMPORT
import styles from './Avatar.module.scss';

/**
 * Composant AvatarGroup - Groupe d'avatars superposés
 * @param {Array} avatars - Liste des props des avatars
 * @param {number} max - Nombre maximum d'avatars à afficher
 * @param {string} size - Taille des avatars
 * @param {string} className - Classes CSS supplémentaires
 */
const AvatarGroup = ({ 
  avatars = [], 
  max = 4, 
  size = 'medium', 
  className = '' 
}) => {
  const avatarsToShow = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={`${styles.group} ${styles[size]} ${className}`}>
      {avatarsToShow.map((avatarProps, index) => (
        <Avatar
          key={index}
          size={size}
          {...avatarProps}
        />
      ))}
      
      {remainingCount > 0 && (
        <Avatar
          size={size}
          className={styles.remaining}
          fallback={`+${remainingCount}`}
        />
      )}
    </div>
  );
};

export default AvatarGroup;