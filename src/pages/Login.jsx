import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import GoogleAuth from '../components/Auth/GoogleAuth';
import Card from '../components/UI/Card';
import styles from './AuthPage.module.scss'; // Update import

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleError, setGoogleError] = useState(''); // New state for Google errors

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  const handleError = (errorMessage) => {
    console.error(errorMessage);
    setGoogleError(errorMessage); // Set the error message
  };

  return (
    <div className={styles.authPage}> {/* Use module style */}
      <Card className={styles.authCard}> {/* Use module style */}
        <LoginForm onSuccess={handleSuccess} onSwitchToRegister={() => navigate('/register')} />
        {googleError && <div className={styles.errorMessage}>{googleError}</div>} {/* Display Google errors */}
        <GoogleAuth
          onSuccess={handleSuccess}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
        />
      </Card>
    </div>
  );
};

export default Login;