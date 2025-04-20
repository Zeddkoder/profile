// Script pour construire l'application en local
// Exécuter avec: node local-build.js
const { execSync } = require('child_process');

console.log('🚀 Début de la construction...');

try {
  // Définir l'environnement
  process.env.NODE_ENV = 'production';
  
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
  process.exit(1);
}