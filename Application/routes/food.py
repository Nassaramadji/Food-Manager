from flask import Blueprint, request, jsonify
from Application.database import db
from Application.models.food import Food
from Application.models.user import User
from Application.models.plat import Plat
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
import os
food_bp = Blueprint('food', __name__)


# ✅ 1. Ajouter un nouveau plat pour l'utilisateur connecté
@food_bp.route('/foods', methods=['POST'])
@jwt_required()
def create_food():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    if not data.get('name'):
        return jsonify({"message": "Le champ 'name' est requis"}), 400

    food = Food(
        name=data['name'],
        description=data.get('description', ''),
        user_id=current_user_id
    )
    db.session.add(food)
    db.session.commit()

    return jsonify({"message": "Plat ajouté", "food_id": food.id}), 201


# ✅ 2. Récupérer les plats de l'utilisateur connecté
@food_bp.route('/my-foods', methods=['GET'])
@jwt_required()
def get_user_foods():
    current_user_id = get_jwt_identity()
    foods = Food.query.filter_by(user_id=current_user_id).all()

    return jsonify([
        {
            "id": f.id,
            "name": f.name,
            "description": f.description,
            "created_at": f.created_at.isoformat(),
            "user_id": f.user_id
        } for f in foods
    ])



# ✅ 5. Modifier un plat
@food_bp.route('/foods/<food_id>', methods=['PUT'])
@jwt_required()
def update_food(food_id):
    food = Food.query.get(food_id)
    current_user_id = get_jwt_identity()

    if not food or food.user_id != current_user_id:
        return jsonify({"message": "Accès refusé"}), 403

    data = request.get_json()
    food.name = data.get('name', food.name)
    food.description = data.get('description', food.description)
    db.session.commit()

    return jsonify({"message": "Plat modifié"})


# ✅ 6. Supprimer un plat
@food_bp.route('/foods/<food_id>', methods=['DELETE'])
@jwt_required()
def delete_food(food_id):
    food = Food.query.get(food_id)
    current_user_id = get_jwt_identity()

    if not food or food.user_id != current_user_id:
        return jsonify({"message": "Accès refusé"}), 403

    db.session.delete(food)
    db.session.commit()
    return jsonify({"message": "Plat supprimé"})

# ✅ 4. Importer les plats à partir d’un fichier JSON
@food_bp.route('/import-plats', methods=['POST'])
def import_plats():
    try:
        with open("plats.json", encoding="utf-8") as f:
            plats = json.load(f)
            for p in plats:
                image_filename = p.get("image_path", "")
                image_url = f"/static/images/{image_filename}" if image_filename else ""

                new_plat = Plat(
                    nom=p.get("nom", ""),
                    description=p.get("description", ""),
                    ingredients=p.get("ingredients", ""),
                    image_url=image_url
                )
                db.session.add(new_plat)

            db.session.commit()
        return jsonify({"message": "Plats importés avec succès"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
