from flask import Flask
from app.config.settings import settings
from app.db.connection import db
from app.routes.user_routes import user_create_bp  

# KISS: Simple initialization of Flask app with clear and direct configuration loading
app = Flask(__name__)
app.config.from_object(settings)  # DRY: configuration handled in a centralized config file
db.init_app(app)

# SOLID - Single Responsibility Principle: Database creation is delegated to app context block
with app.app_context():
    db.create_all()  # KISS: Auto-creation of tables for simplicity in local/dev environments

# POLA: Registering blueprint so all routes are organized and easy to find in 'user_routes'
app.register_blueprint(user_create_bp)

# KISS: Health check endpoint for monitoring
# YAGNI: No extra logic here — just a lightweight status check
@app.route("/")
def health_check():
    return {"status": "User Profile Service OK"}

# POLA: Standard entry point for running the app — nothing surprising to a Python/Flask developer
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
