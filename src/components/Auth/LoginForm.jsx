import React, { useState } from 'react';
import { loginWithEmail } from '../../services/authService';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import styles from '../../pages/AuthPage.module.scss'; // Import AuthPage styles

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginWithEmail(formData.email, formData.password);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h2>Connexion</h2>

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Mot de passe"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {error && <div className={styles.errorMessage}>{error}</div>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>

      <p className={styles.authSwitch}>
        Pas encore de compte?
        <Link to="/register" className={styles.linkButton} onClick={onSwitchToRegister}>
          S'inscrire
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;