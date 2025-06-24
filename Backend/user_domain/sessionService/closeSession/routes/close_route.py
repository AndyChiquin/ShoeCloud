from flask import Blueprint, jsonify
from app.models.session_model import Session
from app.db.redis_client import redis_client
from datetime import datetime

close_session_bp = Blueprint("close_session_bp", __name__, url_prefix="/session")

@close_session_bp.route("/<string:session_id>/end", methods=["PUT"])
def end_session(session_id):
    success = Session.end_session(session_id)
    if success:
        return jsonify({"msg": "Session ended"}), 200
    return jsonify({"error": "Session not found"}), 404
