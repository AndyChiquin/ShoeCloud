from app.models.role_model import Role
from app.db.extensions import db

# SOLID - SRP: This function only handles role creation
# KISS: Simple object creation with fallback for optional fields
def create_role(data):
    new_role = Role(name=data['name'], description=data.get('description'))
    db.session.add(new_role)
    db.session.commit()
    return new_role

# DRY: Centralized logic for fetching all roles from the database
def get_all_roles():
    return Role.query.all()

# KISS: Retrieves a role by ID using built-in ORM methods
def get_role_by_id(role_id):
    return Role.query.get(role_id)

# SOLID - SRP: Updates role attributes only; no extra logic included
# KISS: Clear use of default fallback values if data is missing
def update_role(role_id, data):
    role = Role.query.get(role_id)
    if not role:
        return None
    role.name = data.get('name', role.name)
    role.description = data.get('description', role.description)
    db.session.commit()
    return role

# SRP + POLA: Deletes role in a simple and expected way
def delete_role(role_id):
    role = Role.query.get(role_id)
    if not role:
        return None
    db.session.delete(role)
    db.session.commit()
    return role
