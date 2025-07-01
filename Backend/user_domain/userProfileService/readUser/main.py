from flask import Flask
import os
from dotenv import load_dotenv

if os.environ.get("FLASK_ENV") == "testing":
    from app.config.test_settings import settings
    load_dotenv(".env.test")
else:
    from app.config.settings import settings
    load_dotenv()

from app.db.connection import db
from app.routes.user_routes import user_read_bp

app = Flask(__name__)
app.config.from_object(settings)
db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(user_read_bp)

@app.route("/")
def health_check():
    return {"status": "User Profile Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
