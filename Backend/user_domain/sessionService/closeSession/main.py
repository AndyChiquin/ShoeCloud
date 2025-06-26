from flask import Flask
from createSession.routes.create_route import create_session_bp
from closeSession.routes.close_route import close_session_bp
from readSession.routes.read_route import read_bp

# KISS: Simple Flask app initialization
app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False  # POLA: Keeps JSON responses in declared order, as expected

# KISS + POLA: Cleanly registering session routes using a blueprint
app.register_blueprint(create_session_bp)   # POST /session
app.register_blueprint(close_session_bp)    # PUT /session/<id>/end
app.register_blueprint(read_bp)     # GET /session/user/<id>, PATCH /session/

# KISS: Lightweight health check route
@app.route("/")
def health():
    return {"status": "Session Service OK"}

# POLA: Standard Pythonic entry point for Flask apps
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)
