from app.models.audit_model import create_audit_entry

def log_user_action(user_id, action, metadata=None):
    """
    Lógica principal para registrar una acción del usuario.
    """
    return create_audit_entry(user_id, action, metadata)
