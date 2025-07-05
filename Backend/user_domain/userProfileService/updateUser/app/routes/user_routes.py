from flask import Blueprint, request, jsonify
from app.services.user_service import update_user, update_user_role
import requests

user_update_bp = Blueprint("user_update", __name__, url_prefix="/users")

@user_update_bp.route("/<int:user_id>", methods=["PUT", "OPTIONS"])
def update_user_route(user_id):
    """
    Update user information (except role)
    ---
    tags:
      - Users
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: ID of the user to update
        example: 1
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
              example: Kevin Updated
            email:
              type: string
              example: kevin.new@mail.com
    responses:
      200:
        description: User successfully updated
      400:
        description: Role update not allowed in this endpoint
      404:
        description: User not found
    """

    if request.method == "OPTIONS":
        return jsonify({}), 200  

    data = request.json
    if 'role' in data:
        return jsonify({"error": "Role update not allowed here. Use /users/<id>/role"}), 400

    user = update_user(user_id, data)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"msg": "User updated"}), 200


@user_update_bp.route("/<int:user_id>/role", methods=["PUT"])
def update_role_route(user_id):
    """
    Update a user's role
    ---
    tags:
      - Users
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: ID of the user whose role will be updated
        example: 1
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - role
          properties:
            role:
              type: string
              example: admin
    responses:
      200:
        description: User role successfully updated
      400:
        description: Role is invalid or does not exist
      404:
        description: User not found
      503:
        description: Role validation service unavailable
    """

    data = request.json
    new_role = data.get("role")

    if not new_role:
        return jsonify({"error": "Role is required"}), 400

    try:
        response = requests.get(f"http://3.209.221.173:8008/roles/exists/{new_role}")
        if response.status_code == 200:
            response_json = response.json()
            if not response_json.get("exists", False):
                return jsonify({"error": "Role does not exist"}), 400
        else:
            return jsonify({"error": "Role validation failed", "details": f"Status {response.status_code}"}), 400

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Role service not reachable", "details": str(e)}), 503

    user = update_user_role(user_id, new_role)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": f"User role updated to '{new_role}'"}), 200

