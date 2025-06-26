from app.models.role_model import Role
from app.db.extensions import db

def delete_role(role_id):
    role = Role.query.get(role_id)
    if not role:
        return None
    db.session.delete(role)
    db.session.commit()
    return role
