import React from 'react';
import { signInWithGoogle } from '../../services/authService';
import Button from '../UI/Button';
import styles from './GoogleAuth.module.scss';

const GoogleAuth = ({ onSuccess, onError, loading, setLoading }) => {
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      if (result.success) {
        onSuccess();
      } else {
        onError(result.error);
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.googleAuth}>
      <div className={styles.divider}>
        <span>Ou</span>
      </div>
      <Button
        onClick={handleGoogleLogin}
        disabled={loading}
        className={styles.googleBtn}
        variant="outline"
        type="button"
      >
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
        Se connecter avec Google
      </Button>
    </div>
  );
};

export default GoogleAuth;