// Script pour démarrer l'application en local
// Exécuter avec: node local-start.js

process.env.NODE_ENV = 'development';
require('tsx').run('./server/index.ts');