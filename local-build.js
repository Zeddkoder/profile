// Script pour construire l'application en local
// Exécuter avec: node local-build.js
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { loadEnv } from './server/loadEnv.mjs';

// Charger les variables d'environnement depuis .env
loadEnv();

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Définir l'environnement de production
process.env.NODE_ENV = 'production';

console.log('🚀 Début de la construction...');

try {
  // Créer le dossier dist s'il n'existe pas
  const distDir = join(__dirname, 'dist');
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
  
  // Vérifier que les dépendances sont installées
  console.log('📋 Vérification des dépendances...');
  if (!existsSync(join(__dirname, 'node_modules'))) {
    console.log('📦 Installation des dépendances...');
    execSync('npm install', { stdio: 'inherit' });
  }
  
  console.log('📦 Construction du frontend...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('📦 Construction du backend...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Créer un fichier d'entrée sur mesure pour faciliter l'importation en ESM
  console.log('📝 Création du fichier d\'entrée...');
  const entryContent = "// Fichier d'entrée généré automatiquement\nexport * from './index.js';\n";
  writeFileSync(join(distDir, 'entry.js'), entryContent);
  
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