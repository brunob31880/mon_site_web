Une web application React pour tester quelques composants.

Ici, on va parler de:
- **application**: un script qui construit toute une IHM complexe dans le navigateur au sein d'une page unique,
- **webpack**: un script NodeJs qui gère le _bundling_ (compilation) de l'application à partir des sources,
- **router**: un système interne à l'application pour gérer des chemins et des composants ciblés,

L'objectif de cet atelier est de tester, à l'intérieur d'une application React type, un ensemble de composants permettant d'appréhender les concepts de _hook_, de _HOC_, et de _context_.

# Installation

Après avoir récupéré les sources, ou à la suite de toute nouvelle update, il est nécessaire de vérifier l'installation des dépendances du projet.  
Dans un terminal et depuis la racine du projet, lancer:

    $ npm install

React Playground et ses outils de construction utilisent la syntaxe Javascript ESM (ECMA Script Modules) dernièrement intégrée à NodeJS.  
Node v14 ou ultérieure est donc nécessaire pour faire fonctionner le projet.


# Démarrage

Pour lancer le serveur de développement:

    $ npm run dev

Une fois compilée, l'application s'ouvre automatiquement dans un navigateur.
