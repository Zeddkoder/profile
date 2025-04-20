// Script pour démarrer l'application en local
// Exécuter avec: node local-start.js

// Charger les variables d'environnement depuis .env
require('./server/loadEnv')();

// Définir l'environnement de développement par défaut
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`🚀 Démarrage de l'application en mode ${process.env.NODE_ENV}`);
console.log('💻 Attendez le message indiquant que le serveur est prêt...');

try {
  // Démarrer l'application avec tsx (TypeScript Execute)
  require('tsx').run('./server/index.ts');
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application:', error);
  
  // Vérifier si tsx est installé
  if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('tsx')) {
    console.log('\n🔍 Le module tsx n\'est pas installé. Installation en cours...');
    require('child_process').execSync('npm install -g tsx', { stdio: 'inherit' });
    console.log('✅ Installation terminée. Redémarrage de l\'application...');
    require('tsx').run('./server/index.ts');
  }
}