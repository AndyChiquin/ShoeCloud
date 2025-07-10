from app.models.role_model import Role

def get_all_roles():
    return Role.query.all()

def get_role_by_id(role_id):
    return Role.query.get(role_id)

def role_exists(role_name):
    return Role.query.filter_by(name=role_name).first() is not None
