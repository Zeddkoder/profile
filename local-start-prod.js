// Script pour démarrer l'application en mode production en local
// Exécuter avec: node local-start-prod.js

process.env.NODE_ENV = 'production';
require('./dist/index.js');