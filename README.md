# Food-Manager
Assurer une vie saine et promouvoir le bien-être à tous les âges. Cependant, comprendre les informations alimentaires permet aux individus d’adopter une alimentation saine.

# Food Manager Backend

Ce projet est le backend et frontend de l'application **Food Manager**, développé avec Flask (Python), React et PostgreSQL.

## Fonctionnalités

- Gestion des utilisateurs (inscription, connexion)
- Gestion des aliments et des catégories
- Suivi des stocks et des dates de péremption
- API RESTful pour l'intégration avec le frontend

## Technologies utilisées

- Python (Flask, Flask_SQLAlchemy, Flask_JWT_Extended, etc.)
- React (frontend)
- PostgreSQL (base de données)
- Docker & Docker Compose

## Installation

1. Clonez le dépôt :
    ```bash
    git clone <url-du-repo>
    cd food_manager_backend
    ```
2. Ajoutez vos variables d'environnement si besoin.
3. Lancez l'application avec Docker :
    ```bash
    docker-compose up --build
    ```
4. Accédez à l'application sur [http://localhost:5000](http://localhost:5000)

## Structure du projet

- `Application/` : Backend Flask
- `frontend/` : Frontend React
- `requirements.txt` : Dépendances Python
- `Dockerfile` et `docker-compose.yml` : Déploiement Docker

## Auteur

Nassara Madji Nasaire
Wowe Jacques
Foudawas Mighael

## Licence

Ce projet est sous licence MIT.
