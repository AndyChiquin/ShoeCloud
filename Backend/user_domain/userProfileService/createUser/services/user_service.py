from app.models.user_model import User
from app.db.connection import db
from werkzeug.security import generate_password_hash

# SOLID - Single Responsibility: Each function performs exactly one responsibility.
# DRY: Password hashing is handled only once, at the time of creation.
def create_user(data):
    data["password"] = generate_password_hash(data["password"])
    data["role"] = "user"  # POLA: Assigning default role directly, as expected by convention
    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()
    return new_user
