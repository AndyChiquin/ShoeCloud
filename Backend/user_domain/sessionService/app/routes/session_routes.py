from flask import Blueprint, request, jsonify
from app.models.session_model import Session
import requests

session_bp = Blueprint("session", __name__)
USER_SERVICE_URL = "http://44.218.255.193:8000/users"


@session_bp.route("/", methods=["POST"])
def create_session():
    data = request.json
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    try:
        response = requests.get(f"{USER_SERVICE_URL}/{user_id}")
        if response.status_code != 200:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": "User service unavailable"}), 503

    session = Session(user_id)
    session.save()
    return jsonify({"msg": "Session created", "session_id": session.id}), 201

@session_bp.route("/<string:session_id>/end", methods=["PUT"])
def end_session(session_id):
    success = Session.end_session(session_id)
    if success:
        return jsonify({"msg": "Session ended"}), 200
    return jsonify({"error": "Session not found"}), 404

@session_bp.route("/user/<string:user_id>", methods=["GET"])
def get_sessions_by_user(user_id):
    sessions = Session.get_sessions_by_user(user_id)
    return jsonify({"sessions": sessions}), 200
