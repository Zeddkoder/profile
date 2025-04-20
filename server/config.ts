/**
 * Configuration de l'application
 * 
 * Ce fichier contient les configurations de l'application,
 * y compris la lecture des variables d'environnement
 */

// Récupère les variables d'environnement avec des valeurs par défaut
export const config = {
  // Environnement (development ou production)
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Port du serveur
  PORT: parseInt(process.env.PORT || '5000', 10),
  
  // Limite de taille pour les requêtes
  // Défaut à 50MB
  REQUEST_SIZE_LIMIT: process.env.REQUEST_SIZE_LIMIT || '50mb',
  
  // Options additionnelles ici si nécessaire
};

/**
 * Vérifie si l'application est en mode développement
 */
export const isDevelopment = (): boolean => {
  return config.NODE_ENV === 'development';
};

/**
 * Vérifie si l'application est en mode production
 */
export const isProduction = (): boolean => {
  return config.NODE_ENV === 'production';
};