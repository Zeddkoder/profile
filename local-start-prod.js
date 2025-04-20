// Script pour démarrer l'application en mode production en local
// Exécuter avec: node local-start-prod.js

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { loadEnv } from './server/loadEnv.mjs';

// Charger les variables d'environnement depuis .env
loadEnv();

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Définir l'environnement de production
process.env.NODE_ENV = 'production';

console.log('🚀 Démarrage de l\'application en mode production');
console.log('💻 Attendez le message indiquant que le serveur est prêt...');

try {
  // Vérifier si le dossier dist existe
  if (!existsSync('./dist/index.js')) {
    console.error('❌ Le fichier de build n\'existe pas. Veuillez d\'abord construire l\'application.');
    console.log('💡 Exécutez: node local-build.js');
    process.exit(1);
  }

  // Démarrer l'application depuis le build
  // Utiliser dynamic import pour charger le module ES
  import('./dist/index.js').catch(err => {
    console.error('❌ Erreur lors du chargement de l\'application:', err);
    process.exit(1);
  });
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application:', error);
  process.exit(1);
}