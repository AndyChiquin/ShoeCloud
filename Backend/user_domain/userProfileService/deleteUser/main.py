from flask import Flask
from app.config.settings import settings
from app.db.connection import db
from app.routes.user_routes import user_delete_bp


app = Flask(__name__)
app.config.from_object(settings)  
db.init_app(app)

with app.app_context():
    db.create_all()  

app.register_blueprint(user_delete_bp)



@app.route("/")
def health_check():
    return {"status": "User Profile Service OK"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

# test