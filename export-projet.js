// Script pour exporter le projet dans un fichier zip
// Exécuter avec: node export-projet.js

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readdirSync, statSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
import { createGzip } from 'zlib';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const pipelineAsync = promisify(pipeline);

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const excludeDirs = [
  'node_modules',
  '.git',
  'dist',
  'build',
  'tmp',
  'temp'
];
const excludeFiles = [
  '.env',
  '.DS_Store',
  '.gitignore',
  '*.log',
  '*.zip'
];

// Nom du fichier zip à créer
const projectName = basename(__dirname);
const date = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
const defaultZipName = `${projectName}-${date}.zip`;

// Demander le nom du fichier
async function askFileName() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(`Nom du fichier d'export [${defaultZipName}]: `, (answer) => {
      rl.close();
      resolve(answer || defaultZipName);
    });
  });
}

// Fonction principale
async function exportProject() {
  console.log('🚀 Préparation de l\'export du projet...');
  
  // Demander le nom du fichier
  const zipName = await askFileName();
  const zipFilePath = join(__dirname, zipName);
  
  // Vérifier si le fichier existe déjà
  if (existsSync(zipFilePath)) {
    console.error(`❌ Le fichier ${zipName} existe déjà. Veuillez choisir un autre nom.`);
    process.exit(1);
  }
  
  // Liste des fichiers à inclure
  console.log('📋 Analyse des fichiers du projet...');
  const filesToInclude = [];
  
  function scanDir(dir) {
    const files = readdirSync(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const relativePath = filePath.substring(__dirname.length + 1);
      
      // Vérifier si le fichier doit être exclu
      const isExcludedDir = excludeDirs.some(excluded => 
        relativePath.startsWith(excluded + '/') || relativePath === excluded
      );
      const isExcludedFile = excludeFiles.some(pattern => {
        if (pattern.includes('*')) {
          const regex = new RegExp(pattern.replace('*', '.*'));
          return regex.test(basename(filePath));
        }
        return basename(filePath) === pattern;
      });
      
      if (isExcludedDir || isExcludedFile) continue;
      
      // Ajouter le fichier ou parcourir le répertoire
      const stat = statSync(filePath);
      if (stat.isDirectory()) {
        scanDir(filePath);
      } else {
        filesToInclude.push(relativePath);
      }
    }
  }
  
  scanDir(__dirname);
  console.log(`📂 ${filesToInclude.length} fichiers à exporter`);
  
  // Créer une liste de fichiers pour zip
  const fileList = filesToInclude.join('\n');
  const fileListPath = join(__dirname, '.tmp-file-list');
  writeFileSync(fileListPath, fileList);
  
  try {
    // Créer le zip
    console.log(`📦 Création du fichier ${zipName}...`);
    execSync(`zip -@ "${zipFilePath}" < "${fileListPath}"`, { 
      cwd: __dirname,
      stdio: 'inherit'
    });
    
    console.log(`✅ Export terminé avec succès: ${zipName}`);
  } catch (error) {
    console.error('❌ Erreur pendant la création du zip:', error.message);
    console.log('💡 Essai avec une méthode alternative...');
    
    try {
      // Méthode alternative si zip n'est pas disponible
      if (process.platform === 'win32') {
        // Utiliser PowerShell sur Windows
        const psCommand = `
          $files = Get-Content "${fileListPath}";
          Compress-Archive -Path $files -DestinationPath "${zipFilePath}" -Force;
        `;
        execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' });
      } else {
        // Utiliser tar sur Linux/macOS
        execSync(`tar -czf "${zipFilePath.replace('.zip', '.tar.gz')}" -T "${fileListPath}"`, { 
          cwd: __dirname,
          stdio: 'inherit' 
        });
        console.log(`Note: Fichier créé au format .tar.gz au lieu de .zip: ${zipFilePath.replace('.zip', '.tar.gz')}`);
      }
      
      console.log(`✅ Export terminé avec succès (méthode alternative)`);
    } catch (altError) {
      console.error('❌ Échec de l\'export (méthode alternative):', altError.message);
      console.log('💡 Veuillez installer zip, ou utiliser un outil d\'archivage externe');
    }
  } finally {
    // Nettoyer la liste temporaire
    if (existsSync(fileListPath)) {
      try {
        execSync(`rm "${fileListPath}"`, { stdio: 'ignore' });
      } catch (e) {
        // Ignorer les erreurs de suppression
      }
    }
  }
}

// Exécuter la fonction principale
exportProject().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});