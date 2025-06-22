from flask import Blueprint, request, jsonify
from app.models.session_model import Session
import requests
from app.db.redis_client import redis_client
from datetime import datetime

# KISS: Using Blueprint to organize routes under /session
session_bp = Blueprint("session_bp", __name__, url_prefix="/session")
USER_SERVICE_URL = "http://44.218.255.193:8000/users"

@session_bp.route("/", methods=["POST"])
def create_session():
    data = request.json
    user_id = data.get("user_id")

    # POLA: Standard validation for required field
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    # KISS + SRP: External service validation handled clearly
    try:
        response = requests.get(f"{USER_SERVICE_URL}/{user_id}")
        if response.status_code != 200:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": "User service unavailable"}), 503

    # KISS: Session is created simply with minimal logic
    session = Session(user_id)
    session.save()
    return jsonify({"msg": "Session created", "session_id": session.id}), 201

@session_bp.route("/<string:session_id>/end", methods=["PUT"])
def end_session(session_id):
    # SOLID (SRP): Delegates logic to the model layer
    success = Session.end_session(session_id)
    if success:
        return jsonify({"msg": "Session ended"}), 200
    return jsonify({"error": "Session not found"}), 404

@session_bp.route("/user/<string:user_id>", methods=["GET"])
def get_sessions_by_user(user_id):
    # DRY: Uses model method for fetching sessions
    sessions = Session.get_sessions_by_user(user_id)
    return jsonify({"sessions": sessions}), 200

@session_bp.route("/user/<int:user_id>/close-latest", methods=["PATCH"])
def close_latest_session(user_id):
    # KISS: Print statements for debugging during development (can be removed later)
    print(f"🔍 Searching for sessions for user_id={user_id}")
    keys = redis_client.keys("session:*")
    print(f"🗝️ Found keys: {keys}")

    latest_session_key = None
    latest_start_time = None

    # SOLID (SRP): Only responsible for finding and closing the latest session
    for key in keys:
        session_raw = redis_client.hgetall(key)
        session = dict(session_raw)
        print(f"📦 Session analyzed ({key}):", session)

        if session.get("user_id") == str(user_id) and session.get("status") == "active":
            start = session.get("datetime_start")
            print(f"ACTIVE session detected with start time {start}")
            if start and (latest_start_time is None or start > latest_start_time):
                latest_start_time = start
                latest_session_key = key

    if latest_session_key:
        now = datetime.utcnow().isoformat()
        redis_client.hset(latest_session_key, mapping={
            "status": "closed",
            "datetime_end": now
        })

        updated_session = redis_client.hgetall(latest_session_key)
        updated_session = dict(updated_session)

        print(f"Session successfully closed: {latest_session_key}")
        return jsonify({
            "message": f"Session {latest_session_key} closed",
            "updated_session": updated_session
        }), 200
    else:
        print("⚠️ No active session found to close.")
        return jsonify({"error": "No active session found"}), 404
