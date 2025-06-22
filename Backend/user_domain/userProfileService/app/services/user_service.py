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

# KISS: A simple query to get one user by ID
def get_user_by_id(user_id):
    return User.query.get(user_id)

# DRY + KISS: General reusable method to retrieve all users
def get_all_users():
    return User.query.all()

# SOLID - Open/Closed Principle: You can extend behavior (more fields) without modifying logic
def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return None
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return user

# KISS: Direct logic for deleting a user
# POLA: Standard approach to checking existence and deleting from DB
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return None
    db.session.delete(user)
    db.session.commit()
    return True
