from flask import Blueprint, request, jsonify
from app.services.update_service import update_role

update_bp = Blueprint('update_role', __name__)

@update_bp.route('/roles/<int:role_id>', methods=['PUT'])
def update(role_id):
    """
    Update a role by ID
    ---
    tags:
      - Roles
    parameters:
      - name: role_id
        in: path
        type: integer
        required: true
        description: ID of the role to update
        example: 1
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - name
          properties:
            name:
              type: string
              example: superadmin
    responses:
      200:
        description: Role successfully updated
        schema:
          type: object
          properties:
            id:
              type: integer
              example: 1
            name:
              type: string
              example: superadmin
      404:
        description: Role not found
        schema:
          type: object
          properties:
            error:
              type: string
              example: Role not found
    """

    data = request.json
    role = update_role(role_id, data)
    if role:
        return jsonify(role.to_dict()), 200
    return jsonify({"error": "Role not found"}), 404
