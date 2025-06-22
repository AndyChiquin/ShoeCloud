from flask import Flask
from app.config.settings import settings
from app.routes.auth_routes import auth_bp

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False  # POLA: Keeps response keys in original order

# KISS: Cleanly registering authentication routes
app.register_blueprint(auth_bp)

# KISS: Health check endpoint for monitoring
@app.route("/")
def health():
    return {"status": "Auth Service OK"}

# POLA: Common Flask entry point for service execution
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)

# test
