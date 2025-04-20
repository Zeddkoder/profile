# Générateur de Carte de Profil Professionnel

Cette application permet de créer une carte de profil professionnel personnalisée via un formulaire en plusieurs étapes, puis de télécharger cette carte sous forme d'image.

## Fonctionnalités

- Formulaire multi-étapes avec validation
- Chargement de photo de profil
- Génération d'une carte de profil professionnelle
- Téléchargement de la carte générée au format PNG

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. Clonez ce dépôt ou téléchargez les fichiers source

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

## Exécution en local

### Méthode 1 (recommandée)

Utilisez le script de démarrage local :

```bash
node local-start.js
```

### Méthode 2

Utilisez la commande npm avec cross-env :

```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

### Accès à l'application

L'application sera accessible à l'adresse [http://localhost:5000](http://localhost:5000)

## Structure du projet

- `client/`: Frontend React
  - `src/components/`: Composants React
  - `src/pages/`: Pages de l'application
- `server/`: Backend Express
- `shared/`: Types et schémas partagés

## Notes techniques

- L'application utilise Express pour le backend et React pour le frontend
- La base de données est gérée en mémoire
- Les images sont converties en base64 pour le stockage et le téléchargement
- L'application limite les requêtes à 50MB pour permettre le transfert des photos

## Résolution des problèmes courants

### Erreur de limite de taille de requête

L'application est configurée pour accepter des requêtes jusqu'à 50MB, ce qui devrait être suffisant pour les photos de taille normale. Si vous rencontrez des erreurs liées à la taille des photos, essayez de compresser l'image avant de la télécharger.

### Problèmes de démarrage sur Windows

Si vous rencontrez des problèmes avec les variables d'environnement sur Windows, utilisez la méthode 1 d'exécution (node local-start.js) qui définit les variables d'environnement de manière compatible avec tous les systèmes d'exploitation.