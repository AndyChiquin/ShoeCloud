from app.models.role_model import Role
from app.db.extensions import db

def create_role(data):
    new_role = Role(name=data['name'], description=data.get('description'))
    db.session.add(new_role)
    db.session.commit()
    return new_role

def get_all_roles():
    return Role.query.all()

def get_role_by_id(role_id):
    return Role.query.get(role_id)

def update_role(role_id, data):
    role = Role.query.get(role_id)
    if not role:
        return None
    role.name = data.get('name', role.name)
    role.description = data.get('description', role.description)
    db.session.commit()
    return role

def delete_role(role_id):
    role = Role.query.get(role_id)
    if not role:
        return None
    db.session.delete(role)
    db.session.commit()
    return role
