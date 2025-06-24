from app.models.user_model import User
from app.db.connection import db

def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return None
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return user

def update_user_role(user_id, new_role):
    user = User.query.get(user_id)
    if not user:
        return None
    user.role = new_role
    db.session.commit()
    return user
