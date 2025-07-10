from app.models.user_model import User
from app.db.connection import db
from werkzeug.security import generate_password_hash


def create_user(data):
    data["password"] = generate_password_hash(data["password"])
    data["role"] = "user"  
    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()
    return new_user
