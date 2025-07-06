from flask import Blueprint, jsonify
from app.db.redis_client import redis_client
from datetime import datetime
from app.services.read_service import get_user_sessions

read_bp = Blueprint("read_bp", __name__, url_prefix="/session")

@read_bp.route("/user/<string:user_id>", methods=["GET"])
def get_sessions_by_user(user_id):
    """
    Get all sessions for a user
    ---
    tags:
      - Sessions
    parameters:
      - name: user_id
        in: path
        type: string
        required: true
        description: User ID whose sessions will be retrieved
        example: 1
    responses:
      200:
        description: List of sessions for the user
        schema:
          type: object
          properties:
            sessions:
              type: array
              items:
                type: object
    """

    sessions = get_user_sessions(user_id)
    return jsonify({"sessions": sessions}), 200

@read_bp.route("/user/<int:user_id>/close-latest", methods=["PATCH"])
def close_latest_session(user_id):
    """
    Close the latest active session for a user
    ---
    tags:
      - Sessions
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: User ID to close the most recent session for
        example: 1
    responses:
      200:
        description: Latest session successfully closed
        schema:
          type: object
          properties:
            message:
              type: string
              example: Session session:abc123 closed
            updated_session:
              type: object
      404:
        description: No active session found
        schema:
          type: object
          properties:
            error:
              type: string
              example: No active session found
    """

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
