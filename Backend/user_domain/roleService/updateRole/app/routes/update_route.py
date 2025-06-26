from flask import Blueprint, request, jsonify
from app.services.update_service import update_role

update_bp = Blueprint('update_role', __name__)

@update_bp.route('/roles/<int:role_id>', methods=['PUT'])
def update(role_id):
    data = request.json
    role = update_role(role_id, data)
    if role:
        return jsonify(role.to_dict()), 200
    return jsonify({"error": "Role not found"}), 404
