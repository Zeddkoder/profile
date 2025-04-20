# Guide d'installation et d'utilisation locale

Ce guide vous aidera à installer et exécuter l'application de générateur de carte de profil professionnel sur votre machine locale.

## Prérequis

- [Node.js](https://nodejs.org/) (v14 ou plus récent)
- npm (installé avec Node.js)

## Installation rapide

1. Clonez ou téléchargez ce projet sur votre machine
2. Ouvrez un terminal dans le dossier du projet
3. Exécutez la commande suivante pour installer les dépendances :

```bash
npm install
```

## Utilisation en développement

Pour démarrer l'application en mode développement, exécutez :

```bash
node local-start.js
```

L'application sera accessible à l'adresse [http://localhost:5000](http://localhost:5000)

## Construction et déploiement

Pour construire l'application pour la production :

```bash
node local-build.js
```

Pour démarrer l'application en mode production après la construction :

```bash
node local-start-prod.js
```

## Configuration (optionnelle)

Pour personnaliser certains paramètres, créez un fichier `.env` à la racine du projet en utilisant `.env.example` comme modèle.

## Résolution des problèmes courants

### L'application ne démarre pas

- Vérifiez que Node.js est correctement installé : `node --version`
- Vérifiez que les dépendances sont installées : `npm install`
- Sur Windows, si vous rencontrez des problèmes avec les chemins, utilisez des barres obliques normales (`/`) au lieu de barres obliques inverses (`\`)

### Problèmes avec les photos

- Si les photos ne se téléchargent pas, vérifiez que leur taille est inférieure à 5 Mo
- Le format recommandé pour les photos est JPG ou PNG

### Autres problèmes

Si vous rencontrez d'autres problèmes, vérifiez :
- Que tous les fichiers ont été correctement copiés
- Que vous n'avez pas modifié la structure des dossiers
- Que vous exécutez les commandes à partir du dossier racine du projet