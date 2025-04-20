/**
 * Module de chargement des variables d'environnement (version ESM)
 * Utilisé par les scripts de démarrage en local
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Charge les variables d'environnement depuis un fichier .env
 */
export function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  
  // Vérifier si le fichier .env existe
  if (fs.existsSync(envPath)) {
    console.log('Chargement des variables d\'environnement depuis .env');
    
    // Lire le fichier .env
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');
    
    // Traiter chaque ligne
    envLines.forEach(line => {
      // Ignorer les commentaires et les lignes vides
      if (line.trim() && !line.startsWith('#')) {
        // Extraire la clé et la valeur
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          // Supprimer les guillemets entourant la valeur si présents
          let value = match[2] || '';
          value = value.replace(/^['"]|['"]$/g, '');
          
          // Définir la variable d'environnement
          process.env[key] = value;
        }
      }
    });
  } else {
    console.log('Aucun fichier .env trouvé, utilisation des valeurs par défaut');
  }
}

export default loadEnv;