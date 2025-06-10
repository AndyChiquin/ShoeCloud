from flask import Blueprint, request, jsonify
from app.services.user_service import create_user, get_user_by_id, update_user

user_bp = Blueprint("user", __name__)

@user_bp.route("/users", methods=["POST"])
def register_user():
    data = request.json
    user = create_user(data)
    return jsonify({"id": user.id, "username": user.username}), 201

@user_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name
    })

@user_bp.route("/users/<int:user_id>", methods=["PUT"])
def update_user_route(user_id):
    data = request.json
    user = update_user(user_id, data)
    return jsonify({"msg": "User updated"})
