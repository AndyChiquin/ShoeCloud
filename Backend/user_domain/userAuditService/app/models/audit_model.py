from datetime import datetime
from app.db.mongo import db

# Colección de auditoría
audit_collection = db["user_audit"]

def create_audit_entry(user_id, action, metadata=None):
    audit_doc = {
        "user_id": user_id,
        "action": action,
        "timestamp": datetime.utcnow(),
        "metadata": metadata if metadata else {}
    }
    result = audit_collection.insert_one(audit_doc)
    return str(result.inserted_id)
