from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from Application.database import db
from Application.models.user import User
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST']) # Route pour l'enregistrement des utilisateurs
def register():
    data = request.get_json()

    # Vérifie que tous les champs sont présents
    if not all(k in data for k in ("username", "email", "password")):
        return jsonify({"message": "Champs manquants"}), 400

    # Vérifie si l'utilisateur existe déjà
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email déjà utilisé"}), 409

    # Hash du mot de passe
    hashed_password = generate_password_hash(data['password'])

    # Création de l'utilisateur
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Utilisateur créé avec succès"}), 201


# Route login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Vérification des champs
    if not all(k in data for k in ("email", "password")):
        return jsonify({"message": "Champs email et mot de passe requis"}), 400

    # Vérification que l'utilisateur existe
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Identifiants invalides"}), 401

    # Création du token JWT avec l'id de l'utilisateur
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "user_id": user.id,
        "username": user.username
    }), 200
