import os

from flask import Flask
from flask_cors import CORS

from api.address_routes import address_bp
from api.auth_route import auth_bp
from api.user_route import user_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(address_bp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Default 10000 if not provided
    app.run(host="0.0.0.0", port=port)
