from flask import Blueprint, request, jsonify
from app.services.login_service import login_user


login_bp = Blueprint("login", __name__, url_prefix="/auth")

@login_bp.route("/login", methods=["POST"])
def login():
    """
    User login
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
            - email
            - password
          properties:
            email:
              type: string
              example: kevin@mail.com
            password:
              type: string
              example: mysecurepassword
    responses:
      200:
        description: Login successful
        schema:
          type: object
          properties:
            access_token:
              type: string
              example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
            token_type:
              type: string
              example: bearer
            user_id:
              type: integer
              example: 1
      400:
        description: Missing email or password
      401:
        description: Invalid credentials
    """

    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    result = login_user(email, password)
    if not result["success"]:
        return jsonify({"error": result["error"]}), 401

    return jsonify({
        "access_token": result["token"],
        "token_type": "bearer",
        "user_id": result["user_id"]
    })
