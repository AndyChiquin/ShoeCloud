from flask import Flask
from dotenv import load_dotenv
import os
from flasgger import Swagger


if os.environ.get("FLASK_ENV") == "testing":
    from app.config.test_settings import TestSettings as Settings
    load_dotenv(".env.test")  
else:
    from app.config.config import Config as Settings
    load_dotenv()


from app.db.extensions import db
from app.routes.update_route import update_bp


app = Flask(__name__)
app.config.from_object(Settings)
app.config['JSON_SORT_KEYS'] = False  

db.init_app(app)
app.register_blueprint(update_bp)

swagger = Swagger(app)


@app.route("/")
def health_check():
    return {"status": "Role Service OK"}

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8002)

