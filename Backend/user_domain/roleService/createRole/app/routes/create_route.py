from flask import Blueprint, request, jsonify
from app.services.create_service import create_role

create_bp = Blueprint('create_role', __name__)

@create_bp.route('/roles', methods=['POST'])
def create():
    """
    Create a new role
    ---
    tags:
      - Roles
    parameters:
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
              example: admin
    responses:
      201:
        description: Role successfully created
        schema:
          type: object
          properties:
            id:
              type: integer
              example: 1
            name:
              type: string
              example: admin
      400:
        description: Error while creating role
    """

    data = request.json
    role = create_role(data)
    return jsonify(role.to_dict()), 201
