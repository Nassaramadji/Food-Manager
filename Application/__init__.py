from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from Application.config import Config
from Application.database import db
from flask_cors import CORS
import os




migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
      # Charger la configuration de l'application
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    CORS(app)  # ← Active les requêtes cross-origin (CORS)
    
    from Application.routes.auth import auth_bp  # Importer le blueprint auth
    app.register_blueprint(auth_bp)
    
    from Application.routes.food import food_bp # Importer le blueprint food
    app.register_blueprint(food_bp)
    

    # Import des modèles (à faire après init_app pour éviter les bugs)
    from Application.models import user
    
    
    from Application.routes.plats_route import plats_bp # Importer le blueprint de plats
    from Application.routes.marmiton import marmiton_bp # Importer le blueprint de marmiton

    app.register_blueprint(plats_bp)
    app.register_blueprint(marmiton_bp)

    
    from Application.routes.buffet import buffet_bp  # Importer le blueprint buffet
    app.register_blueprint(buffet_bp)

  
    @app.route('/images/<path:filename>')
    def serve_image(filename):
        return send_from_directory('images', filename)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app

