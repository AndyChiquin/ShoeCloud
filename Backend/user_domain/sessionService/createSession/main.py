from flask import Flask
from dotenv import load_dotenv
import os

if os.environ.get("FLASK_ENV") == "testing":
    from app.config.test_settings import TestSettings as Settings
    load_dotenv(".env.test")
else:
    from app.config.config import Settings
    load_dotenv()

from app.routes.create_route import create_session_bp

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False  
app.config.from_object(Settings)


app.register_blueprint(create_session_bp)  


@app.route("/")
def health():
    return {"status": "Session Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)
