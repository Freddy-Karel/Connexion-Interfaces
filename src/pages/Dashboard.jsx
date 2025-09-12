import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import styles from './Dashboard.module.scss'; // Update import

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!currentUser) {
    return null; // ou un spinner/message de chargement
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Tableau de bord</h1>
        <Button onClick={handleLogout} className={styles.logoutBtn} type="button">
          Déconnexion
        </Button>
      </div>

      <Card className={styles.welcomeCard}>
        <h2>Bienvenue, {currentUser.displayName || currentUser.email}!</h2>
        <p>Ceci est votre tableau de bord personnel.</p>
        {currentUser.photoURL && (
          <img src={currentUser.photoURL} alt="Profile" className={styles.profileImage} />
        )}
      </Card>

      <div className={styles.userInfoGrid}>
        <Card className={styles.infoCard}>
          <h3>Informations utilisateur</h3>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email:</span>
            <span className={styles.infoValue}>{currentUser.email}</span>
          </div>
          {currentUser.displayName && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Nom:</span>
              <span className={styles.infoValue}>{currentUser.displayName}</span>
            </div>
          )}
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>UID:</span>
            <span className={styles.infoValue}>{currentUser.uid}</span>
          </div>
          {currentUser.method && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Méthode de connexion:</span>
              <span className={styles.infoValue}>{currentUser.method}</span>
            </div>
          )}
        </Card>

        <Card className={styles.infoCard}>
          <h3>Activités récentes</h3>
          <p>Aucune activité récente à afficher.</p>
        </Card>
      </div>

      <div className={styles.actionsGrid}>
        <Card className={styles.actionCard}>
          <h3>Gérer le profil</h3>
          <p>Mettez à jour vos informations personnelles.</p>
          <Button onClick={() => navigate('/profile')} variant="primary" type="button">
            Voir le Profil
          </Button>
        </Card>
        <Card className={styles.actionCard}>
          <h3>Paramètres</h3>
          <p>Configurez les préférences de votre compte.</p>
          <Button onClick={() => navigate('/settings')} variant="secondary" type="button">
            Accéder aux paramètres
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;