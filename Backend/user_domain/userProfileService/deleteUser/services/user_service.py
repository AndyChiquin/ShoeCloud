from app.models.user_model import User
from app.db.connection import db

# KISS: Direct logic for deleting a user
# POLA: Standard approach to checking existence and deleting from DB
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return None
    db.session.delete(user)
    db.session.commit()
    return True
