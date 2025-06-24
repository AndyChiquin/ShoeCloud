from app.models.audit_model import create_audit_entry

# SOLID - SRP: Solo se encarga de registrar auditoría
def log_user_action(user_id, action, metadata=None):
   
    return create_audit_entry(user_id, action, metadata)
