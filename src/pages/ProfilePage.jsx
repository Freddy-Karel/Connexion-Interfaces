import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import styles from './ProfilePage.module.scss';
import defaultAvatar from '../assets/profile.png'; // Correction du chemin

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser) {
        return (
            <div className={styles.profilePage}>
                <Card className={styles.profileCard}>
                    <h2>Non connecté</h2>
                    <p>Veuillez vous connecter pour voir votre profil.</p>
                    <Button onClick={() => navigate('/login')} variant="primary" type="button">
                        Se connecter
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className={styles.profilePage}>
            <Card className={styles.profileCard}>
                <h2 className={styles.profileTitle}>Mon Profil</h2>
                <img
                    src={currentUser.photoURL || defaultAvatar}
                    alt="Profile"
                    className={styles.profileImage}
                />
                <div className={styles.infoTable}>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Nom:</span>
                        <span className={styles.infoValue} title={currentUser.displayName} style={{ wordBreak: 'break-all' }}>{currentUser.displayName || 'Non spécifié'}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email:</span>
                        <span className={styles.infoValue} title={currentUser.email} style={{ wordBreak: 'break-all' }}>{currentUser.email}</span>
                    </div>
                    {currentUser.uid && (
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>UID:</span>
                            <span className={styles.infoValue} title={currentUser.uid} style={{ wordBreak: 'break-all' }}>{currentUser.uid}</span>
                        </div>
                    )}
                    {currentUser.method && (
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Méthode de connexion:</span>
                            <span className={styles.infoValue}>{currentUser.method}</span>
                        </div>
                    )}
                </div>
                <div className={styles.profileActions}>
                    <Button onClick={() => alert('Fonctionnalité à implémenter')} variant="secondary" type="button">
                        Modifier le Profil
                    </Button>
                    <Button onClick={() => navigate('/dashboard')} variant="light" type="button">
                        Retour au Tableau de Bord
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;
