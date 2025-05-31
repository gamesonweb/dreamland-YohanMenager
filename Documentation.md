# Dreamz – Documentation du Projet

## Présentation

**Dreamz** est un jeu de labyrinthe 3D développé avec Babylon.js. Le joueur incarne un personnage plongé dans un rêve, devant explorer un labyrinthe, collecter des clés, éviter des ennemis (les cauchemars) et atteindre la sortie. Le jeu est conçu pour être accessible sur ordinateur et mobile, avec une interface responsive et immersive.

---

## Structure du projet

- **index.html** : Page principale du site, point d’entrée de l’application.
- **index.js** : Script principal, gère le routage entre les différentes sections et initialise le jeu.
- **index.css** : Feuille de style principale pour l’ensemble du site.
- **assets/** : Contient toutes les ressources du jeu (modèles 3D, textures, images, sons, musiques).
- **classes/** : Contient toutes les classes JavaScript du jeu, organisées par fonctionnalités (labyrinthe, entités, bonus, gestion des scores, etc.).
- **sections/** : Contient les différentes sections du site (Accueil, Connexion, Jeu3, etc.), chacune avec son propre script et sa propre vue.

---

## Fonctionnalités principales

### 1. Génération et gestion du labyrinthe 3D

- **Génération à partir de matrices** : Chaque niveau est défini par une matrice qui indique la position des murs, des plateformes, des bonus, des ennemis, etc.
- **Affichage 3D** : Utilisation de Babylon.js pour afficher le labyrinthe, les entités et les effets visuels.
- **Gestion des collisions** : Le joueur ne peut pas traverser les murs ou sortir du labyrinthe. Les collisions sont gérées pour tous les objets interactifs.

### 2. Déplacement et caméra

- **Déplacement du joueur** : Contrôles clavier (ou tactile sur mobile) pour déplacer le personnage dans le labyrinthe.
- **Caméra dynamique** : Caméra ArcRotate qui suit le joueur, avec possibilité de zoomer/dézoomer et de pivoter autour du personnage.

### 3. Plateformes et ascenseurs

- **Plateformes mobiles** : Certaines plateformes se déplacent automatiquement ou peuvent être activées par le joueur.
- **Ascenseurs** : Permettent de changer d’étage dans le labyrinthe.

### 4. Bonus et objectifs

- **Clés** : Nécessaires pour ouvrir la sortie du niveau. Leur nombre est affiché à l’écran.
- **Points bonus** : Répartis dans le labyrinthe, ils augmentent le score du joueur.
- **Sortie** : Accessible uniquement après avoir collecté toutes les clés.

### 5. Ennemis (Cauchemars)

- **IA de poursuite** : Les cauchemars patrouillent ou poursuivent le joueur s’il s’approche trop près.
- **Gestion des collisions** : Si le joueur touche un cauchemar, il perd la partie et doit recommencer le niveau.
- **Multiples types d’ennemis** : Possibilité d’ajouter différents comportements ou vitesses selon le type de cauchemar.

### 6. Système de points et classement

- **Calcul du score** : Basé sur le temps restant, les bonus collectés et les clés trouvées.
- **Classement local** : Les scores sont sauvegardés dans le localStorage, avec affichage du classement général et par niveau.
- **Affichage du score en temps réel** : Le HUD affiche le score, le temps restant et le nombre de clés collectées.

### 7. Gestion des utilisateurs

- **Inscription et connexion** : Création de compte avec pseudo et mot de passe (hashé en SHA-256).
- **Gestion de session** : Utilisation de cookies pour maintenir la connexion de l’utilisateur.
- **Sauvegarde des scores par utilisateur** : Chaque utilisateur a son propre historique de scores.

### 8. Interface utilisateur

- **Menu principal** : Permet de choisir un niveau, d’accéder au classement ou de se déconnecter.
- **HUD (Head-Up Display)** : Affiche les informations essentielles (score, temps, clés, etc.) pendant la partie.
- **Responsive design** : L’interface s’adapte à la taille de l’écran, pour une expérience optimale sur mobile et ordinateur.
- **Effets visuels et sonores** : Sons d’ambiance, bruitages lors de la collecte de bonus ou de la rencontre avec un cauchemar.

---

## Principales classes et fichiers

- **Labyrinthe.js** : Classe principale pour la génération et la gestion du labyrinthe (création des murs, plateformes, etc.).
- **Bonus.js** : Gère les objets bonus (clés, points, sortie), leur apparition et leur collecte.
- **Entite.js** : Classe de base pour toutes les entités du jeu (joueur, ennemis, bonus).
- **Personnage.js** : Classe du joueur, gère les déplacements, les collisions et l’état du personnage.
- **Cauchemar.js** : Classe des ennemis, gère leur comportement, leur déplacement et les interactions avec le joueur.
- **Plateforme.js** : Gère les plateformes mobiles et les ascenseurs.
- **Son.js** : Gestion des effets sonores et de la musique de fond.
- **GestionPoints.js** : Gère le calcul, la sauvegarde et l’affichage des scores et du classement.
- **MenuDreamz.js** : Gère l’affichage et la navigation dans le menu principal du jeu.
- **Connexion.js** : Gère l’inscription, la connexion et la gestion de session utilisateur.

---

## Lancement du projet

1. Ouvre le fichier `index.html` dans un navigateur compatible (Chrome, Firefox, Edge, etc.).
2. Inscris-toi ou connecte-toi pour accéder au jeu.
3. Depuis le menu principal, sélectionne un niveau et clique sur "Jouer" pour commencer la partie.
4. Utilise les touches directionnelles (ou les contrôles tactiles) pour déplacer ton personnage dans le labyrinthe.

---

## Dépendances

- [Babylon.js](https://www.babylonjs.com/) (chargé via CDN) : moteur de rendu 3D.
- Aucune dépendance serveur : toutes les données sont stockées en local (localStorage, cookies).

---

## Auteurs

- Yohan Ménager
- Mourichidatou Biokour
- Clément Gorbatch
