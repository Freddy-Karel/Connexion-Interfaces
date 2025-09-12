import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
// Placeholder for icon imports (e.g., from react-icons)
// import { MdDarkMode, MdLightMode, MdNotifications, MdSecurity, MdLanguage, MdIntegration, MdHelp, MdDelete, MdArrowBack, MdPerson } from 'react-icons/md';

import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark';
    });

    const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(true);
    const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('fr'); // Default language

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const handleDarkModeToggle = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleEmailNotificationsToggle = () => {
        setIsEmailNotificationsEnabled(prev => !prev);
    };

    const handlePushNotificationsToggle = () => {
        setIsPushNotificationsEnabled(prev => !prev);
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        // Here you would typically change the app's language context
        alert(`Langue changée en : ${e.target.value.toUpperCase()}`);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
            alert('Fonctionnalité de suppression de compte à implémenter. (Simulation)');
            // Logique de suppression de compte ici (après implémentation backend/Firebase)
        }
    };

    return (
        <div className={styles.settingsPage}>
            <Card className={styles.settingsCard}>
                <h2 className={styles.settingsTitle}>Paramètres de l'Application</h2>

                <div className={styles.settingSection}>
                    <h3 className={styles.sectionTitle}>Apparence</h3>
                    <div className={styles.settingItem}>
                        {/* <MdDarkMode className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Mode Sombre</span>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={isDarkMode} onChange={handleDarkModeToggle} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                <div className={styles.settingSection}>
                    <h3 className={styles.sectionTitle}>Langue</h3>
                    <div className={styles.settingItem}>
                        {/* <MdLanguage className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Sélectionner la langue</span>
                        <select value={selectedLanguage} onChange={handleLanguageChange} className={styles.languageSelect}>
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                            <option value="es">Espagnol</option>
                        </select>
                    </div>
                </div>

                <div className={styles.settingSection}>
                    <h3 className={styles.sectionTitle}>Notifications</h3>
                    <div className={styles.settingItem}>
                        {/* <MdNotifications className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Notifications par Email</span>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={isEmailNotificationsEnabled} onChange={handleEmailNotificationsToggle} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    <div className={styles.settingItem}>
                        {/* <MdNotifications className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Notifications Push</span>
                        <label className={styles.switch}>
                            <input type="checkbox" checked={isPushNotificationsEnabled} onChange={handlePushNotificationsToggle} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                <div className={styles.settingSection}>
                    <h3 className={styles.sectionTitle}>Sécurité du Compte</h3>
                    <div className={styles.settingItem}>
                        {/* <MdSecurity className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Changer le Mot de Passe</span>
                        <Link to="#" className={styles.linkButton}>Modifier</Link>
                    </div>
                    <div className={styles.settingItem}>
                        {/* <MdSecurity className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Authentification à Deux Facteurs</span>
                        <label className={styles.switch}>
                            <input type="checkbox" />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>

                <div className={styles.settingSection}>
                    <h3 className={styles.sectionTitle}>Intégrations</h3>
                    <div className={styles.settingItem}>
                        {/* <MdIntegration className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Connecter à Dropbox</span>
                        <Button variant="info" size="small">Connecter</Button> {/* Placeholder button */}
                    </div>
                </div>

                <div className={styles.settingSection}>
                    <h3 className={styles.sectionTitle}>Support & Aide</h3>
                    <div className={styles.settingItem}>
                        {/* <MdHelp className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Foire Aux Questions (FAQ)</span>
                        <Link to="#" className={styles.linkButton}>Voir</Link>
                    </div>
                    <div className={styles.settingItem}>
                        {/* <MdHelp className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Contacter le Support</span>
                        <Link to="#" className={styles.linkButton}>Contacter</Link>
                    </div>
                </div>

                <div className={styles.settingSection}>
                    <h3 className={styles.sectionTitle}>Gestion du Compte</h3>
                    <div className={styles.settingItem}>
                        {/* <MdPerson className={styles.icon} /> */}
                        <span className={styles.settingLabel}>Gérer votre profil</span>
                        <Link to="/profile" className={styles.linkButton}>Voir le profil</Link>
                    </div>
                    <div className={styles.settingItem}>
                        {/* <MdDelete className={styles.icon} /> */}
                        <Button onClick={handleDeleteAccount} variant="danger" type="button">
                            Supprimer le Compte
                        </Button>
                    </div>
                </div>

                <Button onClick={() => navigate('/dashboard')} variant="primary" type="button" className={styles.backButton}>
                    {/* <MdArrowBack className={styles.buttonIcon} /> */}
                    Retour au Tableau de Bord
                </Button>
            </Card>
        </div>
    );
};

export default SettingsPage;
