from app.models.role_model import Role
from app.db.extensions import db

def update_role(role_id, data):
    role = Role.query.get(role_id)
    if not role:
        return None
    role.name = data.get('name', role.name)
    role.description = data.get('description', role.description)
    db.session.commit()
    return role
