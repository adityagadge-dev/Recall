from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Allows React frontend to make requests without CORS block
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    return app