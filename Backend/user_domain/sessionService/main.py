from flask import Flask
from app.routes.session_routes import session_bp

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False

# Registro de Blueprint
app.register_blueprint(session_bp, url_prefix="/session")

@app.route("/")
def health():
    return {"status": "Session Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)
