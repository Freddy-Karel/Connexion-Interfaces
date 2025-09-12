import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Tooltip.module.scss';

/**
 * Composant Tooltip - Info-bulle contextuelle
 * @param {string} text - Texte à afficher dans le tooltip
 * @param {string} position - Position: 'top', 'bottom', 'left', 'right'
 * @param {number} delay - Délai d'apparition en ms
 * @param {ReactNode} children - Élément qui déclenche le tooltip
 * @param {string} className - Classes CSS supplémentaires
 */
const Tooltip = ({ 
  text, 
  position = 'top', 
  delay = 200, 
  children, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({});
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
      }
      setIsVisible(true);
    }, delay);
  }, [delay]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  // Gestion du positionnement dynamique
  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const { width, height } = tooltip.getBoundingClientRect();
      
      let style = {};
      
      switch (position) {
        case 'top':
          style = {
            top: coords.top - height - 8,
            left: coords.left + coords.width / 2 - width / 2
          };
          break;
        case 'bottom':
          style = {
            top: coords.top + coords.height + 8,
            left: coords.left + coords.width / 2 - width / 2
          };
          break;
        case 'left':
          style = {
            top: coords.top + coords.height / 2 - height / 2,
            left: coords.left - width - 8
          };
          break;
        case 'right':
          style = {
            top: coords.top + coords.height / 2 - height / 2,
            left: coords.left + coords.width + 8
          };
          break;
        default:
          style = {
            top: coords.top - height - 8,
            left: coords.left + coords.width / 2 - width / 2
          };
      }

      // Ajustement pour rester dans la fenêtre
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (style.left < 8) style.left = 8;
      if (style.left + width > viewportWidth - 8) {
        style.left = viewportWidth - width - 8;
      }
      if (style.top < 8) style.top = 8;
      if (style.top + height > viewportHeight - 8) {
        style.top = viewportHeight - height - 8;
      }

      Object.assign(tooltip.style, style);
    }
  }, [isVisible, position, coords]);

  // Gestion de l'accessibilité - version corrigée
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible, hideTooltip]); // Ajout de hideTooltip aux dépendances

  // Nettoyage des timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={styles.tooltipContainer}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {/* Élément déclencheur */}
      <div 
        ref={triggerRef}
        className={styles.trigger}
        aria-describedby={isVisible ? `tooltip-${text}` : undefined}
        tabIndex={0} // Rendre focusable pour l'accessibilité
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          id={`tooltip-${text}`}
          className={`${styles.tooltip} ${styles[position]} ${className}`}
          role="tooltip"
        >
          {text}
          {/* Flèche du tooltip */}
          <div className={styles.arrow} data-position={position} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;