// Script pour démarrer l'application en mode production en local
// Exécuter avec: node local-start-prod.js

// Charger les variables d'environnement depuis .env
require('./server/loadEnv')();

// Définir l'environnement de production
process.env.NODE_ENV = 'production';

console.log('🚀 Démarrage de l\'application en mode production');
console.log('💻 Attendez le message indiquant que le serveur est prêt...');

try {
  // Vérifier si le dossier dist existe
  const fs = require('fs');
  if (!fs.existsSync('./dist/index.js')) {
    console.error('❌ Le fichier de build n\'existe pas. Veuillez d\'abord construire l\'application.');
    console.log('💡 Exécutez: node local-build.js');
    process.exit(1);
  }

  // Démarrer l'application depuis le build
  require('./dist/index.js');
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application:', error);
  process.exit(1);
}