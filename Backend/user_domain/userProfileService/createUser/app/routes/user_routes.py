from flask import Blueprint, request, jsonify, make_response
from app.services.user_service import create_user
from app.models.user_model import User

user_create_bp = Blueprint("user_create", __name__, url_prefix="/users")

@user_create_bp.route("/", methods=["POST", "OPTIONS"])
def register_user():
    if request.method == "OPTIONS":
        return make_response('', 200)

    data = request.json
    user = create_user(data)
    return jsonify({"id": user.id, "name": user.name}), 201
