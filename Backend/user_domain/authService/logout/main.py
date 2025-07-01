from flask import Flask
import os
from dotenv import load_dotenv

if os.environ.get("FLASK_ENV") == "testing":
    from app.config.test_settings import settings
    load_dotenv(".env.test")
else:
    from app.config.settings import settings
    load_dotenv()


app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False 
app.config.from_object(settings)

from app.routes.logout_routes import logout_bp
app.register_blueprint(logout_bp)


@app.route("/")
def health():
    return {"status": "Auth Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)
