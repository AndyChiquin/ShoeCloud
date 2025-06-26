from flask import Flask
from app.config.settings import settings
from app.routes.login_routes import login_bp


...

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False 

app.register_blueprint(login_bp)


@app.route("/")
def health():
    return {"status": "Auth Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)

#test