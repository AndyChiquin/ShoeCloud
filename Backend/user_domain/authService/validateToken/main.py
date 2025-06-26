from flask import Flask
from app.config.settings import settings
from app.routes.validate_routes import validate_bp

...

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False  

app.register_blueprint(validate_bp)

@app.route("/")
def health():
    return {"status": "Auth Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)

