from flask import Blueprint, jsonify
from app.services.user_service import delete_user

user_delete_bp = Blueprint("user_delete", __name__, url_prefix="/users")

@user_delete_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user_route(user_id):
    """
    Delete a user by ID
    ---
    tags:
      - Users
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: ID of the user to be deleted
        example: 1
    responses:
      200:
        description: User successfully deleted
        schema:
          type: object
          properties:
            msg:
              type: string
              example: User 1 deleted
      404:
        description: User not found
        schema:
          type: object
          properties:
            error:
              type: string
              example: User not found
    """
    result = delete_user(user_id)
    if not result:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"msg": f"User {user_id} deleted"})
