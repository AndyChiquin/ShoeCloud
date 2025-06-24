from flask import Blueprint, request, jsonify
from app.services.validate_service import validate_token

validate_bp = Blueprint("validate_token", __name__, url_prefix="/auth")

@validate_bp.route("/validate-token", methods=["POST"])
def validate():
    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"error": "Token required"}), 400

    result = validate_token(token)
    if not result["valid"]:
        return jsonify({"valid": False}), 401

    return jsonify({"valid": True, "user_id": result["user_id"]})
