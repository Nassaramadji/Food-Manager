

#path: Application/routes/marmiton.py
from flask import Blueprint, jsonify
from Application.models.plat import Plat
from Application.database import db
import json

marmiton_bp = Blueprint("marmiton", __name__)
@marmiton_bp.route("/import", methods=["POST"])
def import_plats():
    try:
        with open("plats.json", encoding="utf-8") as f:
            plats_data = json.load(f)

        count = 0
        for plat in plats_data:
            nom = plat.get("nom")
            if not nom:
                print(f"Plat ignoré : {plat}")
                continue

            image_path = plat.get("image_path", "")
            if not image_path and "image_url" in plat:
                image_path = plat["image_url"].split("/")[-1]  # récupération auto du nom

            image_url = f"/images/{image_path}" if image_path else "/images/default.jpg"


            new_plat = Plat(
                nom=nom,
                description=plat.get("description", ""),
                ingredients=plat.get("ingredients", ""),
                image_path=image_path,
                image_url=image_url
            )
            db.session.add(new_plat)
            count += 1

        db.session.commit()
        return jsonify({
            "message": f"{count} plats importés avec succès.",
            "total_fichier": len(plats_data)
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
