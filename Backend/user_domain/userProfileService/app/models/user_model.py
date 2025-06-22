from app.db.connection import db

# SOLID - Single Responsibility Principle (SRP):
# This class is only responsible for mapping the User entity to the database schema
class User(db.Model):
    __tablename__ = 'users'

    # POLA: Column definitions use conventional names and types expected by most developers
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), nullable=False)
