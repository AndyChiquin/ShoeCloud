from flask import Flask
from app.config.settings import settings
from app.db.connection import db
from app.routes.user_routes import user_bp

app = Flask(__name__)
app.config.from_object(settings)
db.init_app(app)

app.register_blueprint(user_bp)

@app.route("/")
def index():
    return {"status": "User Profile Service OK"}

if __name__ == "__main__":
    app.run(debug=True)
