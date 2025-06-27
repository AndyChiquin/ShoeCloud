from flask import Flask
from dotenv import load_dotenv
from app.routes.read_route import read_bp
import os

load_dotenv()

app = Flask(__name__)

app.register_blueprint(read_bp)

PORT = int(os.getenv("PORT", 8004))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)


