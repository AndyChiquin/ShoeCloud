from flask import Blueprint, request, jsonify
from app.services.user_service import create_user
from app.models.user_model import User

# KISS: Using Blueprint to organize routes and keep the app modular
user_create_bp = Blueprint("user_create", __name__, url_prefix="/users")

@user_create_bp.route("/", methods=["POST"])
def register_user():
    # KISS: Clean separation between request input and service logic
    data = request.json
    user = create_user(data)
    return jsonify({"id": user.id, "name": user.name}), 201
