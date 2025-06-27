from flask import Blueprint, request, jsonify
from app.services.user_service import update_user, update_user_role
import requests

user_update_bp = Blueprint("user_update", __name__, url_prefix="/users")

@user_update_bp.route("/<int:user_id>", methods=["PUT"])
def update_user_route(user_id):
    data = request.json
    user = update_user(user_id, data)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"msg": "User updated"})

@user_update_bp.route("/<int:user_id>/role", methods=["PUT"])
def update_role_route(user_id):
    data = request.json
    new_role = data.get("role")

    if not new_role:
        return jsonify({"error": "Role is required"}), 400

    try:
        response = requests.get(f"http://3.209.221.173:8008/roles/exists/{new_role}")
        if response.status_code == 200:
            role_data = response.json()
            if not role_data.get("exists", False):
                return jsonify({"error": "Invalid role"}), 400
        else:
            return jsonify({"error": "Role not found"}), 400

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Role service not reachable", "details": str(e)}), 503
    
    # Si pasó todas las validaciones, actualiza el rol
    user = update_user_role(user_id, new_role)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": f"User role updated to '{new_role}'"}), 200