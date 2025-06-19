from flask import Blueprint, request, jsonify
from app.models.session_model import Session
import requests
from app.db.redis_client import redis_client
from datetime import datetime

session_bp = Blueprint("session_bp", __name__, url_prefix="/session")
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


@session_bp.route("/<int:user_id>/close-latest", methods=["PATCH"])
def close_latest_session(user_id):
    keys = redis_client.keys("session:*")
    latest_session_key = None
    latest_start_time = None

    for key in keys:
        session_raw = redis_client.hgetall(key)
        session = {k.decode(): v.decode() for k, v in session_raw.items()}

        if session.get("user_id") == str(user_id) and session.get("status") == "active":
            start = session.get("datetime_start")
            if start and (latest_start_time is None or start > latest_start_time):
                latest_start_time = start
                latest_session_key = key

    if latest_session_key:
        now = datetime.utcnow().isoformat()
        redis_client.hset(latest_session_key, mapping={
            "status": "closed",
            "datetime_end": now
        })
        return jsonify({"message": f"Session {latest_session_key.decode()} closed"}), 200
    else:
        return jsonify({"error": "No active session found"}), 404


