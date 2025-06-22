from flask import Flask
from dotenv import load_dotenv
from app.routes.order_routes import order_bp
from app.config.db import init_db

load_dotenv()

app = Flask(__name__)
init_db(app)

app.register_blueprint(order_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8009, debug=True)
