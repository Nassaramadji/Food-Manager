# buffet.py
# Buffet routes for managing buffet items in the application.

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Application import db
from Application.models import BuffetItem, Food, User
from flask import Blueprint, request, jsonify

buffet_bp = Blueprint('buffet', __name__)
@buffet_bp.route('/buffet', methods=['POST'])
@jwt_required()
def add_to_buffet():
    data = request.get_json()
    content_type = data.get('content_type', 'food')  # par défaut
    content_id = data.get('content_id') or data.get('food_id')  # accepte food_id

    if not content_id:
        return jsonify({"message": "ID requis"}), 400

    user_id = get_jwt_identity()

    new_item = BuffetItem(
        user_id=user_id,
        content_type=content_type,
        content_id=content_id
    )
    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message": "Ajouté au buffet avec succès"}), 201


@buffet_bp.route("/my-buffet", methods=["GET"])
@jwt_required()
def get_my_buffet():
    user_id = get_jwt_identity()
    items = BuffetItem.query.filter_by(user_id=user_id).all()

    result = []
    for item in items:
        content = item.get_content()
        if content:
            result.append({
                "type": item.content_type,
                "id": content.id,
                "nom": getattr(content, 'nom', getattr(content, 'name', '')),
                "description": content.description,
                "image_url": getattr(content, 'image_url', None),
                "added_at": item.added_at.isoformat()
            })

    return jsonify(result)


@buffet_bp.route("/buffet/<item_id>", methods=["DELETE"])
@jwt_required()
def remove_from_buffet(item_id):
    user_id = get_jwt_identity()
    item = BuffetItem.query.filter_by(id=item_id, user_id=user_id).first()

    if not item:
        return jsonify({"message": "Plat introuvable dans votre buffet"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Plat retiré du buffet"}), 200
