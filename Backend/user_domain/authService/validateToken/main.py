from flask import Flask
import os
from dotenv import load_dotenv
from flask_cors import CORS


if os.environ.get("FLASK_ENV") == "testing":
    from app.config.test_settings import settings
    load_dotenv(".env.test")
else:
    from app.config.settings import settings
    load_dotenv()

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False  
app.config.from_object(settings)

CORS(app)


from app.routes.validate_routes import validate_bp
app.register_blueprint(validate_bp)

@app.route("/")
def health():
    return {"status": "Auth Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)

