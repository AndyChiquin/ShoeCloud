from flask import Flask
from dotenv import load_dotenv
from createAudit.routes.create_route import create_bp
from readAudit.routes.read_route import read_bp
import os

# DRY: Environment variables are loaded from a centralized .env file
load_dotenv()

app = Flask(__name__)

# KISS + POLA: Registering a modular route structure using blueprint
app.register_blueprint(create_bp)
app.register_blueprint(read_bp)

# POLA: Defaulting to port 8004 if not specified in environment — standard practice
PORT = int(os.getenv("PORT", 8004))

# KISS: Simple and predictable application entry point
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)

# YAGNI: The app only includes essential logic — no extra features or abstractions
# test for actions
