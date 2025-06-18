from flask import Blueprint, request, jsonify
from app.services.user_service import create_user, get_user_by_id, update_user, delete_user, get_all_users
from app.models.user_model import User
import requests
from app.db.connection import db

user_bp = Blueprint("user", __name__, url_prefix="/users")  

@user_bp.route("/", methods=["POST"])
def register_user():
    data = request.json
    user = create_user(data)
    return jsonify({"id": user.id, "name": user.name}), 201

@user_bp.route("/<int:user_id>", methods=["GET"])
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

@user_bp.route("/email/<email>", methods=["GET"])
def get_user_by_email(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "role": user.role
    })


@user_bp.route("/", methods=["GET"])
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


@user_bp.route("/<int:user_id>", methods=["PUT"])
def update_user_route(user_id):
    data = request.json
    user = update_user(user_id, data)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"msg": "User updated"})

@user_bp.route("/<int:user_id>/role", methods=["PUT"])
def update_user_role(user_id):
    data = request.json
    new_role = data.get("role")

    if not new_role:
        return jsonify({"error": "Role is required"}), 400

    # 🔁 Verificar que el rol exista en el roleService
    try:
        response = requests.get(f"http://44.218.255.193:8002/roles/exists/{new_role}")
        if response.status_code != 200:
            return jsonify({"error": "Invalid role"}), 400
    except:
        return jsonify({"error": "Role service not reachable"}), 503

    # 🧩 Buscar el usuario y actualizar su rol
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.role = new_role
    db.session.commit()

    return jsonify({"message": f"User role updated to '{new_role}'"}), 200


@user_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user_route(user_id):
    result = delete_user(user_id)
    if not result:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"msg": f"User {user_id} deleted"})

