import { useState } from 'react';
// Import de tous les composants de base dont tu auras besoin
import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';
import Checkbox from '../Checkbox';
import Button from '../Button';
import styles from './Form.module.scss';

// Composant interne pour rendre le champ approprié
const FormField = ({ field, value, onChange, error }) => {
  const commonProps = {
    name: field.name,
    value: value,
    onChange: onChange, // Ici on passe directement la fonction onChange
    error: error,
    placeholder: field.placeholder,
    label: field.label,
    className: styles.formField,
  };

  switch (field.type) {
    case 'select':
      return <Select options={field.options} {...commonProps} />;
    
    case 'textarea':
      return <Textarea rows={field.rows || 3} {...commonProps} />;
    
    case 'checkbox':
      return <Checkbox checked={!!value} {...commonProps} />;
    
    case 'file':
      // Pour les fichiers, on utilise l'input natif pour l'instant
      return (
        <div className={styles.formField}>
          {field.label && <label>{field.label}</label>}
          <input
            type="file"
            name={field.name}
            onChange={onChange} // On passe onChange directement
            accept={field.accept}
          />
        </div>
      );
    
    default: // 'text', 'email', 'number', 'password', etc.
      return <Input type={field.type} {...commonProps} />;
  }
};

const Form = ({ 
  fields = [], 
  onSubmit, 
  submitLabel = "Soumettre", 
  className = '' 
}) => {
  // État initial : créer un objet où les clés sont les noms des champs
  const initialValues = {};
  fields.forEach(field => {
    initialValues[field.name] = field.value || (field.type === 'checkbox' ? false : '');
  });

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Fonction qui gère les changements de tous les champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Gestion spéciale pour les checkboxes
    const inputValue = type === 'checkbox' ? checked : value;

    // Met à jour les données du formulaire
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    // Effacer l'erreur du champ quand l'utilisateur modifie la valeur
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation simple
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = field.errorMessage || 'Ce champ est requis';
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Si validation passée, on appelle la fonction onSubmit du parent
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${className}`}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleChange} // On passe handleChange directement
          error={errors[field.name]}
        />
      ))}
      
      <Button 
        type="submit" 
        label={submitLabel} 
        variant="primary" 
        className={styles.submitButton}
      />
    </form>
  );
};

export default Form;