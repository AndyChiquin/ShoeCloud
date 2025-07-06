from flask import Blueprint, jsonify
from app.models.session_model import Session
from app.db.redis_client import redis_client
from datetime import datetime

close_session_bp = Blueprint("close_session_bp", __name__, url_prefix="/session")

@close_session_bp.route("/<string:session_id>/end", methods=["PUT"])
def end_session(session_id):
    """
    End a session by session ID
    ---
    tags:
      - Sessions
    parameters:
      - name: session_id
        in: path
        type: string
        required: true
        description: The ID of the session to end
        example: abc123-session
    responses:
      200:
        description: Session successfully ended
        schema:
          type: object
          properties:
            msg:
              type: string
              example: Session ended
      404:
        description: Session not found
        schema:
          type: object
          properties:
            error:
              type: string
              example: Session not found
    """

    success = Session.end_session(session_id)
    if success:
        return jsonify({"msg": "Session ended"}), 200
    return jsonify({"error": "Session not found"}), 404
