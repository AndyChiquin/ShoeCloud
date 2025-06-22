from flask import Blueprint, request, jsonify
from app.services.audit_service import log_user_action
import requests

# KISS: Blueprint is used to organize routes cleanly
audit_bp = Blueprint("audit_bp", __name__)

@audit_bp.route("/log", methods=["POST"])
def log_action():
    data = request.get_json()

    user_id = data.get("user_id")
    action = data.get("action")
    metadata = data.get("metadata", {})

    # POLA: Simple and predictable validation logic
    if not user_id or not action:
        return jsonify({"error": "user_id and action are required"}), 400

    # SOLID - SRP: Logging logic is handled by service layer, not inside the route
    audit_id = log_user_action(user_id, action, metadata)
    return jsonify({"message": "Audit log created", "id": audit_id}), 201

@audit_bp.route("/logs/<int:user_id>", methods=["GET"])
def get_user_logs(user_id):
    # KISS + DRY: Using a clear Mongo query to get logs
    from app.models.audit_model import audit_collection

    logs = list(audit_collection.find({"user_id": user_id}, {"_id": 0}))
    return jsonify(logs), 200
