from flask import Blueprint, request, jsonify
from app.services.auth_service import login_user, validate_token, logout_user

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.route("/login", methods=["POST"])
def login():
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


@auth_bp.route("/validate-token", methods=["POST"])
def validate():
    data = request.json
    token = data.get("token")

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

    if not token:
        return jsonify({"error": "Token required"}), 400

    result = logout_user(token)
    if not result["success"]:
        return jsonify({"error": result["error"]}), 401

    return jsonify({"message": "Logout successful"}), 200
