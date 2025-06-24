from flask import Flask
from dotenv import load_dotenv
from app.config.config import Config
from app.db.extensions import db
from createRole.routes.create_route import create_bp
from readRole.routes.read_route import read_bp
from updateRole.routes.update_route import update_bp
from deleteRole.routes.delete_route import delete_bp

# DRY: Environment variables loaded once and reused across the app
load_dotenv()

app = Flask(__name__)

# KISS + DRY: Configuration is centralized using a Config class
app.config.from_object(Config)
app.config['JSON_SORT_KEYS'] = False  # POLA: Keeps JSON output in the same order as defined

# SOLID - SRP: Database initialization handled separately in extensions module
db.init_app(app)

# KISS: Routes are registered clearly using Blueprints
app.register_blueprint(create_bp)
app.register_blueprint(read_bp)
app.register_blueprint(update_bp)
app.register_blueprint(delete_bp)

# KISS: Health check endpoint for observability
@app.route("/")
def health_check():
    return {"status": "Role Service OK"}

# SOLID: Context block ensures DB tables are created only when needed (e.g., for development)
with app.app_context():
    db.create_all()

# POLA: Standard Python/Flask entry point; behavior is expected and predictable
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8002)
