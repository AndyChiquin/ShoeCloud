from flask import Blueprint, jsonify
from app.services.delete_service import delete_role

delete_bp = Blueprint('delete_role', __name__)

@delete_bp.route('/roles/<int:role_id>', methods=['DELETE'])
def delete(role_id):
    role = delete_role(role_id)
    if role:
        return jsonify({"message": "Role deleted"}), 200
    return jsonify({"error": "Role not found"}), 404
