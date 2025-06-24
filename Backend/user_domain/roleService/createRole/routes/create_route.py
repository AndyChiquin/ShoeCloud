from flask import Blueprint, request, jsonify
from createRole.services.create_service import create_role

create_bp = Blueprint('create_role', __name__)

@create_bp.route('/roles', methods=['POST'])
def create():
    data = request.json
    role = create_role(data)
    return jsonify(role.to_dict()), 201
