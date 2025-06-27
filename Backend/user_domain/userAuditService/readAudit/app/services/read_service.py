from app.models.audit_model import audit_collection

def get_user_logs(user_id):
    """
    Obtiene todos los registros de auditoría para un usuario.
    """
    return list(audit_collection.find({"user_id": user_id}, {"_id": 0}))
