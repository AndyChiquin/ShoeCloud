from flask import Blueprint, request, jsonify
from app.services.create_service import log_user_action

create_bp = Blueprint("create_bp", __name__, url_prefix="/audit")

@create_bp.route("/log", methods=["POST"])
def log_action():
    data = request.get_json()

    user_id = data.get("user_id")
    action = data.get("action")
    metadata = data.get("metadata", {})

    if not user_id or not action:
        return jsonify({"error": "user_id and action are required"}), 400

    audit_id = log_user_action(user_id, action, metadata)
    return jsonify({"message": "Audit log created", "id": audit_id}), 201
