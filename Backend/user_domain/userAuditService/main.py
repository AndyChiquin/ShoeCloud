from flask import Flask
from app.routes.audit_routes import audit_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.register_blueprint(audit_bp)

PORT = int(os.getenv("PORT", 8004))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
