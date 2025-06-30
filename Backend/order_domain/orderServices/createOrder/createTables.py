from flask import Flask
from dotenv import load_dotenv
from app.config.db_config import init_db, db
from app.models.order_model import Order

# Cargar variables de entorno
load_dotenv()

# Crear la aplicación Flask
app = Flask(__name__)

# Inicializar base de datos
init_db(app)

# Crear tablas
with app.app_context():
    db.create_all()
    print("✅ Tablas creadas exitosamente en la base de datos MySQL.")
