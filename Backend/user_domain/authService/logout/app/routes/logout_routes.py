from flask import Blueprint, request, jsonify
from app.services.logout_service import logout_user

logout_bp = Blueprint("logout", __name__, url_prefix="/auth")

@logout_bp.route("/logout", methods=["POST"])
def logout():
    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"error": "Token required"}), 400

    result = logout_user(token)
    if not result["success"]:
        return jsonify({"error": result["error"]}), 401

    return jsonify({"message": "Logout successful"}), 200
