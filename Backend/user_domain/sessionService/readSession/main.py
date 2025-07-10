from flask import Flask
from dotenv import load_dotenv
import os
from flasgger import Swagger


if os.environ.get("FLASK_ENV") == "testing":
    from app.config.test_settings import TestSettings as Settings
    load_dotenv(".env.test")
else:
    from app.config.config import Settings
    load_dotenv()

from app.routes.read_route import read_bp


app = Flask(__name__)
app.config.from_object(Settings)
app.config["JSON_SORT_KEYS"] = False  

swagger = Swagger(app)


app.register_blueprint(read_bp)   
  
@app.route("/")
def health():
    return {"status": "Session Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)

