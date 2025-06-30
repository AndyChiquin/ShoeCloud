from flask import Flask
from dotenv import load_dotenv
from app.routes.order_routes import order_bp
from app.config.db_config import init_db

# Cargar variables de entorno
load_dotenv()

# Inicializar la app y la base de datos
app = Flask(__name__)
init_db(app)

# Registrar las rutas del microservicio de creación de órdenes
app.register_blueprint(order_bp)

# Ruta base opcional para verificar estado
@app.route('/')
def health_check():
    return {'message': 'CreateOrder microservice is running'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8009, debug=True)
