from flask import Blueprint, request, jsonify
from app.services.role_service import *


role_bp = Blueprint('role_bp', __name__)

@role_bp.route('/roles', methods=['POST'])
def create():
    data = request.json
    role = create_role(data)
    return jsonify(role.to_dict()), 201

@role_bp.route('/roles', methods=['GET'])
def get_all():
    roles = get_all_roles()
    return jsonify([r.to_dict() for r in roles]), 200

@role_bp.route('/roles/<int:role_id>', methods=['GET'])
def get(role_id):
    role = get_role_by_id(role_id)
    if role:
        return jsonify(role.to_dict()), 200
    return jsonify({"error": "Role not found"}), 404

@role_bp.route("/roles/exists/<string:role_name>", methods=["GET"])
def role_exists(role_name):
    role = Role.query.filter_by(name=role_name).first()
    if role:
        return jsonify({"exists": True}), 200
    else:
        return jsonify({"exists": False}), 404
    

@role_bp.route('/roles/<int:role_id>', methods=['PUT'])
def update(role_id):
    data = request.json
    role = update_role(role_id, data)
    if role:
        return jsonify(role.to_dict()), 200
    return jsonify({"error": "Role not found"}), 404

@role_bp.route('/roles/<int:role_id>', methods=['DELETE'])
def delete(role_id):
    role = delete_role(role_id)
    if role:
        return jsonify({"message": "Role deleted"}), 200
    return jsonify({"error": "Role not found"}), 404
