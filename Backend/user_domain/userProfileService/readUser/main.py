from flask import Flask
import os
from dotenv import load_dotenv

# Cargar configuración según entorno
if os.environ.get("FLASK_ENV") == "testing":
    from test.test_read_user import settings
    load_dotenv(".env.test")
else:
    from app.config.settings import settings
    load_dotenv()

from app.db.connection import db
from app.routes.user_routes import user_read_bp

# Inicializar Flask
app = Flask(__name__)
app.config.from_object(settings)
db.init_app(app)

# Crear tablas si no existen (en SQLite en testing)
with app.app_context():
    db.create_all()

# Registrar blueprint
app.register_blueprint(user_read_bp)

# Health check para CI/CD
@app.route("/")
def health_check():
    return {"status": "Read User Service OK"}

# Iniciar servidor
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
