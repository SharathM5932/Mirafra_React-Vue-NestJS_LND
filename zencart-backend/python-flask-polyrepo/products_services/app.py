import os

from flask import Flask
from flask_cors import CORS

from api.category_route import category_bp
from api.products_route import products_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(category_bp)
app.register_blueprint(products_bp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10002))
    app.run(host="0.0.0.0", port=port)
