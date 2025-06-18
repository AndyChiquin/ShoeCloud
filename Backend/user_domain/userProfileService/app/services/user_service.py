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

def get_user_by_id(user_id):
    return User.query.get(user_id)

def get_all_users():
    return User.query.all()


def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return None
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return user

def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return None
    db.session.delete(user)
    db.session.commit()
    return True

