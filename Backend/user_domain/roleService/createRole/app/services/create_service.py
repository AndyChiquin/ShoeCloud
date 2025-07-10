from app.models.role_model import Role
from app.db.extensions import db

def create_role(data):
    new_role = Role(name=data['name'], description=data.get('description'))
    db.session.add(new_role)
    db.session.commit()
    return new_role
