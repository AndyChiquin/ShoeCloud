from flask import Blueprint, jsonify
from app.services.user_service import get_user_by_id, get_all_users, get_user_by_email
from app.models.user_model import User

user_read_bp = Blueprint("user_read", __name__, url_prefix="/users")

@user_read_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    })

@user_read_bp.route("/", methods=["GET"])
def get_all_users_route():
    users = get_all_users()
    result = []
    for user in users:
        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        })
    return jsonify(result)

@user_read_bp.route("/email/<email>", methods=["GET"])
def get_user_by_email_route(email):
    user = get_user_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "role": user.role
    })
