from flask import Blueprint, jsonify
from app.services.read_service import get_all_roles, get_role_by_id, role_exists

read_bp = Blueprint('read_role', __name__)

@read_bp.route('/roles', methods=['GET'])
def get_all():
    """
    Get all roles
    ---
    tags:
      - Roles
    responses:
      200:
        description: List of all roles
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                example: 1
              name:
                type: string
                example: admin
    """

    roles = get_all_roles()
    return jsonify([r.to_dict() for r in roles]), 200

@read_bp.route('/roles/<int:role_id>', methods=['GET'])
def get(role_id):
    """
    Get a role by ID
    ---
    tags:
      - Roles
    parameters:
      - name: role_id
        in: path
        type: integer
        required: true
        description: ID of the role
        example: 2
    responses:
      200:
        description: Role found
        schema:
          type: object
          properties:
            id:
              type: integer
              example: 2
            name:
              type: string
              example: user
      404:
        description: Role not found
        schema:
          type: object
          properties:
            error:
              type: string
              example: Role not found
    """

    role = get_role_by_id(role_id)
    if role:
        return jsonify(role.to_dict()), 200
    return jsonify({"error": "Role not found"}), 404

@read_bp.route('/roles/exists/<string:role_name>', methods=['GET'])
def exists(role_name):
    """
    Check if a role exists by name
    ---
    tags:
      - Roles
    parameters:
      - name: role_name
        in: path
        type: string
        required: true
        description: Name of the role to check
        example: admin
    responses:
      200:
        description: Existence check result
        schema:
          type: object
          properties:
            exists:
              type: boolean
              example: true
      500:
        description: Internal server error
        schema:
          type: object
          properties:
            error:
              type: string
              example: Internal server error
            details:
              type: string
              example: Exception message
    """

    try:
        exists = role_exists(role_name)
        return jsonify({"exists": exists}), 200
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
