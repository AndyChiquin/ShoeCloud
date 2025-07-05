from flask import Blueprint, request, jsonify
from app.services.logout_service import logout_user

logout_bp = Blueprint("logout", __name__, url_prefix="/auth")

@logout_bp.route("/logout", methods=["POST"])
def logout():
    """
    User logout
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
        description: Logout successful
        schema:
          type: object
          properties:
            message:
              type: string
              example: Logout successful
      400:
        description: Token is required
      401:
        description: Invalid or expired token
    """

    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"error": "Token required"}), 400

    result = logout_user(token)
    if not result["success"]:
        return jsonify({"error": result["error"]}), 401

    return jsonify({"message": "Logout successful"}), 200
