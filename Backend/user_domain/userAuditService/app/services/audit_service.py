from app.models.audit_model import create_audit_entry

# SOLID - SRP: This function has a single responsibility — to delegate the audit creation
# KISS: The function is simple, readable, and does exactly one thing
# DRY: Centralized logic allows reuse from any route or context
def log_user_action(user_id, action, metadata=None):
    """
    Main logic to register a user's action.
    """
    return create_audit_entry(user_id, action, metadata)
