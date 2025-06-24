from flask import Blueprint, jsonify
from deleteUser.services.user_service import delete_user

user_delete_bp = Blueprint("user_delete", __name__, url_prefix="/users")

@user_delete_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user_route(user_id):
    # KISS: Clear control flow for deletion
    result = delete_user(user_id)
    if not result:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"msg": f"User {user_id} deleted"})
