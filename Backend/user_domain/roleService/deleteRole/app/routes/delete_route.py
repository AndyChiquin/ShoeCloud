from flask import Blueprint, jsonify
from app.services.delete_service import delete_role

delete_bp = Blueprint('delete_role', __name__)

@delete_bp.route('/roles/<int:role_id>', methods=['DELETE'])
def delete(role_id):
    """
    Delete a role by ID
    ---
    tags:
      - Roles
    parameters:
      - name: role_id
        in: path
        type: integer
        required: true
        description: ID of the role to delete
        example: 2
    responses:
      200:
        description: Role successfully deleted
        schema:
          type: object
          properties:
            message:
              type: string
              example: Role deleted
      404:
        description: Role not found
        schema:
          type: object
          properties:
            error:
              type: string
              example: Role not found
    """

    role = delete_role(role_id)
    if role:
        return jsonify({"message": "Role deleted"}), 200
    return jsonify({"error": "Role not found"}), 404
