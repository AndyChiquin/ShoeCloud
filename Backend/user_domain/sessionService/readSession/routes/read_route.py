from flask import Blueprint, jsonify
from app.db.redis_client import redis_client
from datetime import datetime
from readSession.services.read_service import get_user_sessions

read_bp = Blueprint("read_bp", __name__, url_prefix="/session")

@read_bp.route("/user/<string:user_id>", methods=["GET"])
def get_sessions_by_user(user_id):
    sessions = get_user_sessions(user_id)
    return jsonify({"sessions": sessions}), 200

@read_bp.route("/user/<int:user_id>/close-latest", methods=["PATCH"])
def close_latest_session(user_id):
    keys = redis_client.keys("session:*")
    latest_session_key = None
    latest_start_time = None

    for key in keys:
        session_raw = redis_client.hgetall(key)
        session = dict(session_raw)
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
        updated_session = dict(redis_client.hgetall(latest_session_key))
        return jsonify({
            "message": f"Session {latest_session_key} closed",
            "updated_session": updated_session
        }), 200

    return jsonify({"error": "No active session found"}), 404
