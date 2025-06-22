from flask import Blueprint, request, jsonify
from app.services.auth_service import login_user, validate_token, logout_user

# KISS: Blueprint used to organize authentication routes under a clear prefix
auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # POLA: Basic input validation, expected by any client developer
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    # SOLID - SRP: Delegates business logic to service layer
    result = login_user(email, password)
    if not result["success"]:
        return jsonify({"error": result["error"]}), 401

    return jsonify({
        "access_token": result["token"],
        "token_type": "bearer",
        "user_id": result["user_id"]
    })

@auth_bp.route("/validate-token", methods=["POST"])
def validate():
    data = request.json
    token = data.get("token")

    # KISS: Validates required field directly
    if not token:
        return jsonify({"error": "Token required"}), 400

    result = validate_token(token)
    if not result["valid"]:
        return jsonify({"valid": False}), 401

    return jsonify({"valid": True, "user_id": result["user_id"]})

@auth_bp.route("/logout", methods=["POST"])
def logout():
    data = request.json
    token = data.get("token")

    # POLA + KISS: Clear error if token not provided
    if not token:
        return jsonify({"error": "Token required"}), 400

    result = logout_user(token)
    if not result["success"]:
        return jsonify({"error": result["error"]}), 401

    return jsonify({"message": "Logout successful"}), 200
