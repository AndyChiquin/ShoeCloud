from flask import Blueprint, request, jsonify
from app.services.validate_service import validate_token

validate_bp = Blueprint("validate_token", __name__, url_prefix="/auth")

@validate_bp.route("/validate-token", methods=["POST"])
def validate():
    """
    Validate authentication token
    ---
    tags:
      - Auth
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - token
          properties:
            token:
              type: string
              example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
    responses:
      200:
        description: Token is valid
        schema:
          type: object
          properties:
            valid:
              type: boolean
              example: true
            user_id:
              type: integer
              example: 1
      400:
        description: Token is required
      401:
        description: Invalid or expired token
    """

    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"error": "Token required"}), 400

    result = validate_token(token)
    if not result["valid"]:
        return jsonify({"valid": False}), 401

    return jsonify({"valid": True, "user_id": result["user_id"]})
