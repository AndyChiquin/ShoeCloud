from flask import Flask
from app.routes.session_routes import session_bp

# KISS: Simple Flask app initialization
app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False  # POLA: Keeps JSON responses in declared order, as expected

# KISS + POLA: Cleanly registering session routes using a blueprint
app.register_blueprint(session_bp)

# KISS: Lightweight health check route
@app.route("/")
def health():
    return {"status": "Session Service OK"}

# POLA: Standard Pythonic entry point for Flask apps
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)
