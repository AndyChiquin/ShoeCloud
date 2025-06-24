from flask import Blueprint, request, jsonify
import requests
from app.db.redis_client import redis_client
from app.models.session_model import Session

create_session_bp = Blueprint("create_session_bp", __name__, url_prefix="/session")
USER_SERVICE_URL = "http://44.218.255.193:8000/users"

@create_session_bp.route("/", methods=["POST"])
def create_session():
    data = request.json
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        response = requests.get(f"{USER_SERVICE_URL}/{user_id}")
        if response.status_code != 200:
            return jsonify({"error": "User not found"}), 404
    except Exception:
        return jsonify({"error": "User service unavailable"}), 503

    session = Session(user_id)
    session.save()
    return jsonify({"msg": "Session created", "session_id": session.id}), 201
