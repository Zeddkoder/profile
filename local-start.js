// Script pour démarrer l'application en local
// Exécuter avec: node local-start.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import { loadEnv } from './server/loadEnv.mjs';

// Charger les variables d'environnement depuis .env
loadEnv();

// Obtenir le chemin du répertoire actuel (équivalent à __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Définir l'environnement de développement par défaut
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`🚀 Démarrage de l'application en mode ${process.env.NODE_ENV}`);
console.log('💻 Attendez le message indiquant que le serveur est prêt...');

try {
  // Démarrer l'application avec tsx (TypeScript Execute)
  execSync('npx tsx ./server/index.ts', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: process.env.NODE_ENV }
  });
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application:', error);
  
  // Vérifier si tsx est installé
  if (error.status === 127 || (error.message && error.message.includes('command not found'))) {
    console.log('\n🔍 Le module tsx n\'est pas installé. Installation en cours...');
    execSync('npm install -g tsx', { stdio: 'inherit' });
    console.log('✅ Installation terminée. Redémarrage de l\'application...');
    execSync('npx tsx ./server/index.ts', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: process.env.NODE_ENV }
    });
  }
}