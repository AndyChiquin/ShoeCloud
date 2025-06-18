from flask import Flask
from dotenv import load_dotenv
from app.config.config import Config
from app.db.extensions import db
from app.routes.role_routes import role_bp

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
app.config['JSON_SORT_KEYS'] = False  

db.init_app(app)
app.register_blueprint(role_bp)

@app.route("/")
def health_check():
    return {"status": "Role Service OK"}

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8002)

