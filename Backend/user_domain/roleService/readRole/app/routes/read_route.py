from flask import Blueprint, jsonify
from app.services.read_service import get_all_roles, get_role_by_id, role_exists

read_bp = Blueprint('read_role', __name__)

@read_bp.route('/roles', methods=['GET'])
def get_all():
    roles = get_all_roles()
    return jsonify([r.to_dict() for r in roles]), 200

@read_bp.route('/roles/<int:role_id>', methods=['GET'])
def get(role_id):
    role = get_role_by_id(role_id)
    if role:
        return jsonify(role.to_dict()), 200
    return jsonify({"error": "Role not found"}), 404

@read_bp.route('/roles/exists/<string:role_name>', methods=['GET'])
def exists(role_name):
    exists = role_exists(role_name)
    return jsonify({"exists": exists}), 200 if exists else (jsonify({"exists": False}), 404)
