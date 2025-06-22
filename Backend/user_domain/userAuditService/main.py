from flask import Flask
from app.routes.audit_routes import audit_bp
from dotenv import load_dotenv
import os

# DRY: Environment variables are loaded from a centralized .env file
load_dotenv()

app = Flask(__name__)

# KISS + POLA: Registering a modular route structure using blueprint
app.register_blueprint(audit_bp)

# POLA: Defaulting to port 8004 if not specified in environment — standard practice
PORT = int(os.getenv("PORT", 8004))

# KISS: Simple and predictable application entry point
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)

# YAGNI: The app only includes essential logic — no extra features or abstractions
# test for actions
