from flask import Blueprint, request, jsonify
from app.services.login_service import login_user


login_bp = Blueprint("login", __name__, url_prefix="/auth")

@login_bp.route("/login", methods=["POST"])
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
