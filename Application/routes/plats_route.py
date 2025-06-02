#routes/plats_route.py
from flask import Blueprint, jsonify, send_from_directory
from Application.database import db
from Application.models.plat import Plat
import os

plats_bp = Blueprint("plats", __name__)

@plats_bp.route('/plats', methods=['GET'])
def get_all_plats():
    plats = Plat.query.all()
    return jsonify([
        {
            "id": p.id,
            "nom": p.nom,
            "description": p.description,
            "ingredients": p.ingredients,
            "image_url": f"/images/eru1.jpeg"
        }
        for p in plats
    ])

