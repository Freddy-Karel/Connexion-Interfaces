import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithEmail } from '../services/authService';
import GoogleAuthButton from '../components/Auth/GoogleAuth';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import styles from './AuthPage.module.scss'; // Update import

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // New state for GoogleAuth loading

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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    const result = await registerWithEmail(formData.email, formData.password, formData.name);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleGoogleSuccess = () => {
    navigate('/dashboard');
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className={styles.authPage}> {/* Use module style */}
      <Card className={styles.authCard}> {/* Use module style */}
        <form onSubmit={handleSubmit} className={styles.authForm}> {/* Use module style */}
          <h2>Créer un compte</h2>

          <Input
            label="Nom complet"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <Input
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <div className={styles.errorMessage}>{error}</div>} {/* Use module style */}

          <Button type="submit" disabled={loading}>
            {loading ? 'Création du compte...' : 'Créer un compte'}
          </Button>

          <p className={styles.authSwitch}> {/* Use module style */}
            Déjà un compte?
            <Link to="/login" className={styles.linkButton}> {/* Use module style */}
              Se connecter
            </Link>
          </p>
        </form>

        <div className={styles.googleAuth}> {/* Use module style */}
          <div className={styles.divider}> {/* Use module style */}
            <span>Ou</span>
          </div>
          <GoogleAuthButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            loading={googleLoading} // Pass googleLoading state
            setLoading={setGoogleLoading} // Pass setGoogleLoading function
          />
        </div>
      </Card>
    </div>
  );
};

export default Register;