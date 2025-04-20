// Script pour exporter le projet dans un fichier zip
// Exécuter avec: node export-projet.js
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');

// Installer archiver si nécessaire
try {
  require.resolve('archiver');
} catch (e) {
  console.log('📦 Installation du module archiver...');
  execSync('npm install archiver', { stdio: 'inherit' });
}

const output = fs.createWriteStream(path.join(__dirname, 'profile-generator.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Niveau de compression maximum
});

// Écouteurs d'événements
output.on('close', function() {
  console.log(`✅ Archive créée: ${archive.pointer()} octets au total`);
  console.log('📁 Le fichier profile-generator.zip a été créé dans le répertoire racine du projet');
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('⚠️ Avertissement:', err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipes
archive.pipe(output);

// Liste des fichiers et dossiers à inclure
const include = [
  'client',
  'server',
  'shared',
  'public',
  'README.md',
  'local-start.js',
  'local-build.js',
  'local-start-prod.js',
  '.gitignore',
  'drizzle.config.ts',
  'postcss.config.js',
  'tailwind.config.ts',
  'theme.json',
  'tsconfig.json',
  'vite.config.ts',
  'package.json',
  'attached_assets'
];

// Liste des fichiers et dossiers à exclure
const exclude = [
  'node_modules',
  'dist',
  '.DS_Store',
  '.git',
  '*.log'
];

console.log('🚀 Création de l\'archive...');

// Ajouter les fichiers et dossiers inclus
include.forEach(item => {
  try {
    const itemPath = path.join(__dirname, item);
    if (fs.existsSync(itemPath)) {
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
        archive.directory(itemPath, item, data => {
          // Exclure les fichiers et dossiers non désirés
          const relativePath = path.relative(__dirname, data.path);
          return !exclude.some(excludeItem => relativePath.includes(excludeItem));
        });
      } else {
        archive.file(itemPath, { name: item });
      }
      console.log(`✓ Ajouté: ${item}`);
    } else {
      console.log(`⚠️ Élément non trouvé, ignoré: ${item}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'ajout de ${item}:`, error.message);
  }
});

// Finalisez l'archive
archive.finalize();