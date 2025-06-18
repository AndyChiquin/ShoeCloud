from flask import Blueprint, request, jsonify
from app.models.session_model import Session

session_bp = Blueprint("session", __name__)

@session_bp.route("/", methods=["POST"])
def create_session():
    data = request.json
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

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
