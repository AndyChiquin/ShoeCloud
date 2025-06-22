from datetime import datetime
from app.db.mongo import db

# SOLID - SRP (Single Responsibility Principle): This variable encapsulates only the audit collection reference
# POLA: The collection name is descriptive and clearly related to its purpose
audit_collection = db["user_audit"]

# KISS: The function is short, clear, and easy to understand
# SOLID - SRP: This function has a single responsibility — to create an audit log entry
# YAGNI: The logic includes only necessary fields (no extra validation or formatting)
def create_audit_entry(user_id, action, metadata=None):
    audit_doc = {
        "user_id": int(user_id),
        "action": action,
        "timestamp": datetime.utcnow(),
        "metadata": metadata if metadata else {}
    }
    result = audit_collection.insert_one(audit_doc)
    return str(result.inserted_id)
