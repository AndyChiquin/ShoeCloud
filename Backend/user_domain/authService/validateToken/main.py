from flask import Flask
from app.config.settings import settings
from login.routes.login_routes import login_bp
from validateToken.routes.validate_routes import validate_bp
from logout.routes.logout_routes import logout_bp


...

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False  # POLA: Keeps response keys in original order

# KISS: Cleanly registering authentication routes
app.register_blueprint(login_bp)
app.register_blueprint(validate_bp)
app.register_blueprint(logout_bp)


# KISS: Health check endpoint for monitoring
@app.route("/")
def health():
    return {"status": "Auth Service OK"}

# POLA: Common Flask entry point for service execution
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)

# test
