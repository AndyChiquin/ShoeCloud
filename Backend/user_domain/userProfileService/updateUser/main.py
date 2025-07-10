from flask import Flask
from app.config.settings import settings
from flask_cors import CORS
from flask import Flask, request
from flasgger import Swagger




import os
from dotenv import load_dotenv

if os.environ.get("FLASK_ENV") == "testing":
    from app.config.test_settings import settings
    load_dotenv(".env.test")
else:
    from app.config.settings import settings
    load_dotenv()

from app.db.connection import db
from app.routes.user_routes import user_update_bp

app = Flask(__name__)
app.config.from_object(settings)  
db.init_app(app)
CORS(app, origins=["http://localhost:9000", "http://52.200.35.19"], supports_credentials=True)


with app.app_context():
    db.create_all()  

swagger = Swagger(app)

app.register_blueprint(user_update_bp)
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "PUT,OPTIONS"
    return response


@app.route("/")
def health_check():
    return {"status": "User Profile Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

