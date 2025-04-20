// Script pour construire l'application en local
// Exécuter avec: node local-build.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement depuis .env
require('./server/loadEnv')();

// Définir l'environnement de production
process.env.NODE_ENV = 'production';

console.log('🚀 Début de la construction...');

try {
  // Créer le dossier dist s'il n'existe pas
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Vérifier que les dépendances sont installées
  console.log('📋 Vérification des dépendances...');
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('📦 Installation des dépendances...');
    execSync('npm install', { stdio: 'inherit' });
  }
  
  console.log('📦 Construction du frontend...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('📦 Construction du backend...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('✅ Construction terminée avec succès!');
  console.log('');
  console.log('Pour démarrer l\'application en production, exécutez:');
  console.log('node local-start-prod.js');
} catch (error) {
  console.error('❌ Erreur pendant la construction:', error);
  console.error(error.stack || error);
  
  if (error.message && error.message.includes('command not found') && error.message.includes('npx')) {
    console.log('\n💡 Il semble que npx ne soit pas disponible. Installez Node.js (version 14 ou supérieure) pour utiliser npx.');
  }
  
  process.exit(1);
}