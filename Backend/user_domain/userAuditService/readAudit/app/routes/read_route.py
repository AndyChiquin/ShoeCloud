from flask import Blueprint, jsonify
from app.services.read_service import get_user_logs

# KISS: Organiza rutas de lectura
read_bp = Blueprint("read_bp", __name__, url_prefix="/audit")

@read_bp.route("/logs/<int:user_id>", methods=["GET"])
def read_logs(user_id):
    logs = get_user_logs(user_id)
    return jsonify(logs), 200
